import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Calculator, ExternalLink, FileText, Lock, ScrollText, Video } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ADMIN_API_URL } from "@/lib/admin-api";

type Resource = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  icon: string;
  color: string;
  access_type: "free" | "paid";
  status: "available" | "coming_soon";
};

type Subject = {
  title: string;
  slug: string;
  subject_categories: {
    title: string;
    slug: string;
  };
};

const iconMap = {
  notes: BookOpen,
  videos: Video,
  worksheets: FileText,
  formula: Calculator,
  cheatsheet: ScrollText,
  file: FileText,
};

const colorMap: Record<string, string> = {
  blue: "from-blue-500 to-blue-700",
  red: "from-red-500 to-red-700",
  green: "from-green-500 to-green-700",
  purple: "from-purple-500 to-purple-700",
  amber: "from-amber-500 to-amber-700",
};

const SubjectResources = () => {
  const { curriculum, subject } = useParams<{ curriculum: string; subject: string }>();
  const navigate = useNavigate();
  const [resources, setResources] = useState<Resource[]>([]);
  const [subjectData, setSubjectData] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResources = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${ADMIN_API_URL}/api/subject-resources/${subject}`);
        const payload = await response.json().catch(() => ({}));
        setResources(response.ok ? payload.data || [] : []);
        setSubjectData(response.ok ? payload.subject : null);
      } finally {
        setLoading(false);
      }
    };

    if (subject) void loadResources();
  }, [subject]);

  const subjectName = subjectData?.title || subject || "Subject";
  const curriculumLabel = subjectData?.subject_categories.title || curriculum?.toUpperCase() || "Course";
  const fallbackBackPath = "/resources";
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

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              {curriculumLabel} {subjectName}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#1E3A8A] mb-4">
              Available{" "}
              <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">
                Resources
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Access all study materials for {curriculumLabel} {subjectName}.
            </p>
          </motion.div>

          {loading ? (
            <p className="text-center text-muted-foreground">Loading resources...</p>
          ) : resources.length === 0 ? (
            <p className="mx-auto max-w-2xl rounded-xl border bg-card p-8 text-center text-muted-foreground">
              No resources have been added for this subject yet.
            </p>
          ) : (
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource, index) => {
                const Icon = iconMap[resource.icon as keyof typeof iconMap] || FileText;
                const labelText =
                  resource.status === "coming_soon"
                    ? "Coming Soon"
                    : resource.access_type === "paid"
                    ? "Paid Only"
                    : "Click for more";
                const labelColor = resource.access_type === "paid" ? "text-red-600" : "text-[#FACC15]";
                const card = (
                  <div className="group relative bg-card rounded-xl border-2 border-[#1E3A8A] overflow-hidden hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] transition-all h-full">
                    <div className={`h-2 bg-gradient-to-r ${colorMap[resource.color] || colorMap.blue}`} />
                    <div className="p-6">
                      <div className="w-14 h-14 rounded-xl bg-[#1E3A8A]/10 flex items-center justify-center mb-4 group-hover:bg-[#1E3A8A] transition-colors">
                        <Icon className="w-7 h-7 text-[#1E3A8A] group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="font-heading font-bold text-lg text-[#1E3A8A] mb-1">{resource.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
                      <div className={`flex items-center gap-2 text-xs ${labelColor} font-semibold`}>
                        {resource.status === "available" ? <ExternalLink className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                        {labelText}
                      </div>
                    </div>
                  </div>
                );

                return (
                  <motion.div key={resource.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.08 }}>
                    {resource.status === "available" ? (
                      <Link to={`/resources/${curriculum}/${subject}/${resource.slug}`}>{card}</Link>
                    ) : (
                      card
                    )}
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

export default SubjectResources;
