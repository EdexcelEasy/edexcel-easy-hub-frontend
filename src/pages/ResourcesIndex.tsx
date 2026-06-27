import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";
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
  subjects: Subject[];
};

const ResourcesIndex = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${ADMIN_API_URL}/api/subjects/categories`);
        const payload = await response.json().catch(() => ({}));
        setCategories(response.ok ? payload.data || [] : []);
      } finally {
        setLoading(false);
      }
    };

    void loadCategories();
  }, []);

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
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              Study Materials
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#1E3A8A] mb-4">
              Explore{" "}
              <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">
                Resources
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Choose your subject to access notes, videos, worksheets, booklets, cheatsheets, and more.
            </p>
          </motion.div>

          {loading ? (
            <p className="text-center text-muted-foreground">Loading resources...</p>
          ) : categories.length === 0 ? (
            <div className="mx-auto max-w-2xl rounded-xl border bg-card p-8 text-center text-muted-foreground">
              <BookOpen className="mx-auto mb-3 h-8 w-8 text-primary" />
              No subject categories have been added yet.
            </div>
          ) : (
            <div className="mx-auto max-w-6xl space-y-8">
              {categories.map((category, categoryIndex) => (
                <motion.section
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.08 }}
                  className="overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-white via-sky-50/70 to-amber-50/80 shadow-[0_18px_50px_rgba(30,58,138,0.08)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-primary/10 bg-white/70 p-5 backdrop-blur md:p-6">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-amber-100 text-primary">
                        <Layers3 className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="font-heading text-2xl font-bold text-[#1E3A8A] md:text-3xl">{category.title}</h2>
                        <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                    <span className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {category.subjects.length} subject{category.subjects.length === 1 ? "" : "s"}
                    </span>
                  </div>

                  <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 md:p-6">
                    {category.subjects.map((subject) => (
                      <Link key={subject.id} to={`/resources/${category.slug}/${subject.slug}`}>
                        <div className="group relative h-full overflow-hidden rounded-xl border border-primary/15 bg-white p-4 transition-all hover:-translate-y-1 hover:border-[#1E3A8A] hover:shadow-[0_14px_36px_rgba(250,204,21,0.25)]">
                          <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-[70px] bg-sky-100/80 transition-colors group-hover:bg-amber-100" />
                          <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border-2 border-[#1E3A8A]/20 bg-sky-50 transition-colors group-hover:bg-[#1E3A8A]">
                            <SubjectIcon name={subject.title} className="h-6 w-6 text-[#1E3A8A] transition-colors group-hover:text-white" />
                          </div>
                          <h3 className="relative z-10 font-heading font-bold text-[#1E3A8A]">{subject.title}</h3>
                          <p className="relative z-10 mt-2 text-xs leading-relaxed text-muted-foreground">{subject.description}</p>
                          <p className="relative z-10 mt-4 text-xs font-semibold text-amber-600">View resources</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResourcesIndex;
