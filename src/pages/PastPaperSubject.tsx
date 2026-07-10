import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  fetchPastPapers,
  formatCurriculumName,
  formatSubjectName,
  getPaperSessions,
  getPaperUnits,
  type PastPaperRecord,
} from "@/lib/past-papers";

const PastPaperSubject = () => {
  const { curriculum, subject } = useParams<{ curriculum: string; subject: string }>();
  const [papers, setPapers] = useState<PastPaperRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const curriculumSlug = curriculum || "";
  const subjectSlug = subject || "";
  const curriculumName = formatCurriculumName(curriculumSlug);
  const subjectName = formatSubjectName(subjectSlug);
  const units = useMemo(() => getPaperUnits(papers), [papers]);

  useEffect(() => {
    const loadPapers = async () => {
      if (!curriculumSlug || !subjectSlug) return;
      setLoading(true);
      setError("");
      try {
        setPapers(await fetchPastPapers(curriculumSlug, subjectSlug));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load papers.");
      } finally {
        setLoading(false);
      }
    };

    void loadPapers();
  }, [curriculumSlug, subjectSlug]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Link to={`/past-papers/${curriculumSlug}`}>
            <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {curriculumName} Past Papers
            </Button>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              {curriculumName} Past Papers
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#1E3A8A] mb-4">
              {subjectName} <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">Papers</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Access past examination papers for {subjectName}.
            </p>
          </motion.div>

          {loading ? (
            <p className="text-center text-muted-foreground">Loading papers...</p>
          ) : error ? (
            <p className="mx-auto max-w-2xl rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center text-destructive">{error}</p>
          ) : units.length === 0 ? (
            <p className="mx-auto max-w-2xl rounded-xl border bg-card p-8 text-center text-muted-foreground">No papers have been added for this subject yet.</p>
          ) : (
            <div className="grid gap-8 max-w-4xl mx-auto md:grid-cols-2">
              {units.map((unit, unitIndex) => {
                const sessions = getPaperSessions(papers, unit.code);
                return (
                  <motion.div key={unit.code} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: unitIndex * 0.08 }} className="bg-card rounded-xl p-6 border-2 border-[#1E3A8A]">
                    <h2 className="font-heading font-bold text-2xl text-[#1E3A8A] mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1E3A8A]/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#1E3A8A]" />
                      </div>
                      {unit.name}
                    </h2>
                    <div className="space-y-2">
                      {sessions.map((session, index) => (
                        <Link key={`${unit.code}-${session}`} to={`/${curriculumSlug}/${subjectSlug}/${encodeURIComponent(unit.name)}/${encodeURIComponent(session)}`}>
                          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.03 }} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-[#1E3A8A] hover:bg-muted/30 transition-all cursor-pointer group">
                            <span className="text-muted-foreground text-sm w-6">{index + 1}.</span>
                            <span className="font-medium text-foreground group-hover:text-[#1E3A8A] transition-colors">{session}</span>
                          </motion.div>
                        </Link>
                      ))}
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

export default PastPaperSubject;
