import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ADMIN_API_URL } from "@/lib/admin-api";
import { SubjectIcon } from "@/lib/subject-icons";

type Subject = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
};

type Category = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  kicker: string | null;
  subjects: Subject[];
};

const SubjectCategory = ({ categorySlug }: { categorySlug?: string }) => {
  const params = useParams<{ categorySlug: string }>();
  const slug = categorySlug || params.categorySlug;
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategory = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${ADMIN_API_URL}/api/subjects/categories/${slug}`);
        const payload = await response.json().catch(() => ({}));
        setCategory(response.ok ? payload.data : null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) void loadCategory();
  }, [slug]);

  const title = category?.title || slug?.toUpperCase() || "Subjects";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Link to="/">
            <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              {category?.kicker || `${title} Programme`}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#1E3A8A] mb-4">
              {title}{" "}
              <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">
                Subjects
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {category?.description || "Explore our comprehensive range of subjects with expert guidance and resources."}
            </p>
          </motion.div>

          {loading ? (
            <p className="text-center text-muted-foreground">Loading subjects...</p>
          ) : !category ? (
            <div className="text-center">
              <h2 className="text-2xl font-heading font-bold text-[#1E3A8A]">Category not found</h2>
              <p className="mt-2 text-muted-foreground">Create this category from the admin dashboard.</p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {category.subjects.map((subject, index) => (
                <Link key={subject.id} to={`/${subject.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    className="relative bg-card rounded-xl p-4 border border-border overflow-hidden group hover:border-[#1E3A8A] hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] transition-all cursor-pointer h-full"
                  >
                    <div className="absolute top-0 right-0 w-14 h-14 bg-muted/50 rounded-bl-[60px] -z-0" />
                    <div className="relative z-10 w-10 h-10 rounded-lg border-2 border-[#1E3A8A]/20 flex items-center justify-center mb-3 bg-background overflow-hidden group-hover:bg-[#1E3A8A] transition-colors">
                      <SubjectIcon name={subject.title} className="w-5 h-5 text-[#1E3A8A] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="relative z-10 font-heading font-bold text-base text-[#1E3A8A] mb-1">
                      {subject.title}
                    </h3>
                    <p className="relative z-10 text-muted-foreground text-xs leading-relaxed">
                      {subject.description}
                    </p>
                  </motion.div>
                </Link>
              ))}

              {category.subjects.length === 0 && (
                <div className="col-span-full rounded-xl border bg-card p-8 text-center text-muted-foreground">
                  <BookOpen className="mx-auto mb-3 h-8 w-8 text-primary" />
                  No subjects have been added yet.
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SubjectCategory;
