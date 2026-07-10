import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchPastPaperSubjects, type PastPaperSubject } from "@/lib/past-papers";

const IALPastPapers = () => {
  const [subjects, setSubjects] = useState<PastPaperSubject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSubjects = async () => {
      setLoading(true);
      setError("");
      try {
        setSubjects(await fetchPastPaperSubjects("ial"));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load past papers.");
      } finally {
        setLoading(false);
      }
    };

    void loadSubjects();
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
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              IAL Past Papers
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#1E3A8A] mb-4">
              IAL Past <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">Papers</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Access past examination papers and mark schemes for all IAL subjects.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-3">
            {loading ? (
              <p className="text-center text-muted-foreground">Loading subjects...</p>
            ) : error ? (
              <p className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center text-destructive">{error}</p>
            ) : subjects.length === 0 ? (
              <p className="rounded-xl border bg-card p-6 text-center text-muted-foreground">No IAL past papers have been added yet.</p>
            ) : (
              subjects.map((subject, index) => (
                <Link key={subject.slug} to={`/ial-past-papers/${subject.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <div className="flex items-center gap-4 bg-card rounded-xl p-4 border border-border hover:border-[#1E3A8A] hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] transition-all cursor-pointer group">
                      <span className="text-muted-foreground font-medium text-sm w-6">{index + 1})</span>
                      <div className="w-10 h-10 rounded-lg border-2 border-[#1E3A8A]/20 flex items-center justify-center bg-background group-hover:border-[#1E3A8A]/40 transition-colors">
                        <FileText className="w-5 h-5 text-[#1E3A8A]" />
                      </div>
                      <h3 className="font-heading font-semibold text-[#1E3A8A] text-lg flex-1">{subject.name}</h3>
                    </div>
                  </motion.div>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IALPastPapers;
