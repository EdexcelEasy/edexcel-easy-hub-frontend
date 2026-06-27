import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Lock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ADMIN_API_URL } from "@/lib/admin-api";

type ResourceItem = {
  id: string;
  title: string;
  description: string | null;
  url: string | null;
  file_url: string | null;
  file_type: string | null;
  access_type: "free" | "paid";
};

type Resource = {
  title: string;
  slug: string;
  description: string | null;
  subject_resource_items: ResourceItem[];
};

type Subject = {
  title: string;
  slug: string;
  subject_categories: {
    title: string;
    slug: string;
  };
};

const SubjectResourceDetail = () => {
  const { curriculum, subject, resource } = useParams<{ curriculum: string; subject: string; resource: string }>();
  const navigate = useNavigate();
  const [resourceData, setResourceData] = useState<Resource | null>(null);
  const [subjectData, setSubjectData] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResource = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${ADMIN_API_URL}/api/subject-resources/${subject}/${resource}`);
        const payload = await response.json().catch(() => ({}));
        setResourceData(response.ok ? payload.data : null);
        setSubjectData(response.ok ? payload.subject : null);
      } finally {
        setLoading(false);
      }
    };

    if (subject && resource) void loadResource();
  }, [subject, resource]);

  const subjectName = subjectData?.title || subject || "Subject";
  const curriculumLabel = subjectData?.subject_categories.title || curriculum?.toUpperCase() || "Course";
  const fallbackBackPath = `/resources/${curriculum}/${subject}`;
  const goBack = () => {
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate(fallbackBackPath);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80" onClick={goBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              {curriculumLabel} {subjectName}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#1E3A8A] mb-4">
              {resourceData?.title || "Resource"}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {resourceData?.description || `All ${resourceData?.title || "resource"} materials for ${subjectName}.`}
            </p>
          </motion.div>

          {loading ? (
            <p className="text-center text-muted-foreground">Loading materials...</p>
          ) : !resourceData ? (
            <p className="mx-auto max-w-2xl rounded-xl border bg-card p-8 text-center text-muted-foreground">Resource not found.</p>
          ) : resourceData.subject_resource_items.length === 0 ? (
            <p className="mx-auto max-w-2xl rounded-xl border bg-card p-8 text-center text-muted-foreground">No materials have been added yet.</p>
          ) : (
            <div className="mx-auto max-w-3xl space-y-4">
              {resourceData.subject_resource_items.map((item, index) => {
                const href = item.file_url || item.url || "";
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    className="rounded-xl border-2 border-[#1E3A8A] bg-card p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h2 className="font-heading text-lg font-bold text-[#1E3A8A]">{item.title}</h2>
                        <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                        <p className={`mt-3 flex items-center gap-2 text-xs font-semibold ${item.access_type === "paid" ? "text-red-600" : "text-emerald-600"}`}>
                          <Lock className="h-3.5 w-3.5" />
                          {item.access_type === "paid" ? "Paid Only" : "Free"}
                        </p>
                      </div>
                      {href && (
                        <Button asChild>
                          <a href={href} target="_blank" rel="noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            Open
                          </a>
                        </Button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubjectResourceDetail;
