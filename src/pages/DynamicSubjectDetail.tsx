import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ADMIN_API_URL } from "@/lib/admin-api";
import SubjectCategory from "./SubjectCategory";

type Topic = {
  id: string;
  title: string;
  sort_order: number;
};

type Unit = {
  id: string;
  title: string;
  sort_order: number;
  subject_topics: Topic[];
};

type SubjectDetail = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  heading: string | null;
  subheading: string | null;
  resources_text: string | null;
  subject_categories: {
    title: string;
    slug: string;
  };
  subject_units: Unit[];
};

const DynamicSubjectDetail = () => {
  const { subjectSlug, subject: subjectParam } = useParams<{ subjectSlug: string; subject: string }>();
  const slug = subjectSlug || subjectParam;
  const isCategoryRoute = Boolean(slug?.endsWith("-subjects"));
  const [subjectData, setSubjectData] = useState<SubjectDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubject = async () => {
      if (!slug || isCategoryRoute) return;
      setLoading(true);
      try {
        const response = await fetch(`${ADMIN_API_URL}/api/subjects/${slug}`);
        const payload = await response.json().catch(() => ({}));
        setSubjectData(response.ok ? payload.data : null);
      } finally {
        setLoading(false);
      }
    };

    void loadSubject();
  }, [slug, isCategoryRoute]);

  const topicCount = useMemo(
    () => subjectData?.subject_units.reduce((total, unit) => total + unit.subject_topics.length, 0) || 0,
    [subjectData],
  );

  if (isCategoryRoute && slug) {
    return <SubjectCategory categorySlug={slug.replace(/-subjects$/, "")} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-20">
          <p className="text-center text-muted-foreground">Loading subject...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!subjectData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-heading font-bold text-[#1E3A8A]">Subject not found</h1>
            <Link to="/">
              <Button variant="outline" className="mt-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryPath = `/${subjectData.subject_categories.slug}-subjects`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Link to={categoryPath}>
            <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {subjectData.subject_categories.title} Subjects
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              {subjectData.subject_categories.title} {subjectData.title}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#1E3A8A] mb-4">
              {subjectData.heading || subjectData.title}{" "}
              <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">
                Specification
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {subjectData.subheading || subjectData.description || `Explore the complete syllabus topics for ${subjectData.title}.`}
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto grid gap-4 sm:grid-cols-2 mb-8">
            <Link to={`/resources/${subjectData.subject_categories.slug}/${subjectData.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#1E3A8A] rounded-xl p-5 cursor-pointer hover:bg-[#1E3A8A]/90 transition-colors h-full"
              >
                <h4 className="font-heading font-bold text-white text-base md:text-lg">
                  Available Resources
                </h4>
                <p className="text-white/80 text-sm mt-1">
                  {subjectData.resources_text || "Notes, videos, worksheets, formula booklet & cheatsheet"}
                </p>
              </motion.div>
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#1E3A8A] rounded-xl p-5"
            >
              <h4 className="font-heading font-bold text-white text-base md:text-lg">
                Quick Stats
              </h4>
              <p className="text-white/80 text-sm mt-1">
                {subjectData.subject_units.length} units • {topicCount} topics
              </p>
            </motion.div>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {subjectData.subject_units.map((unit, index) => (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 + 0.4 }}
                className="bg-card rounded-xl border-2 border-[#1E3A8A] overflow-hidden hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] transition-all"
              >
                <div className="bg-[#1E3A8A]/5 px-6 py-4 border-b border-[#1E3A8A]">
                  <h2 className="font-heading font-bold text-lg text-[#1E3A8A]">
                    {unit.title}
                  </h2>
                </div>
                <div className="p-6">
                  <ul className="space-y-2">
                    {unit.subject_topics.map((topic) => (
                      <li key={topic.id} className="flex items-center gap-3 text-muted-foreground hover:text-[#1E3A8A] transition-colors">
                        <ChevronRight className="w-4 h-4 text-[#FACC15]" />
                        <span>{topic.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DynamicSubjectDetail;
