import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, FileText } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  fetchPastPapers,
  formatSubjectName,
  getPaperSessions,
  getPaperUnits,
  type PastPaperRecord,
} from "@/lib/past-papers";

const IALPastPaperDetail = () => {
  const { subject } = useParams<{ subject: string }>();
  const [papers, setPapers] = useState<PastPaperRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);
  const subjectName = formatSubjectName(subject || "");
  const units = useMemo(() => getPaperUnits(papers), [papers]);

  useEffect(() => {
    const loadPapers = async () => {
      if (!subject) return;
      setLoading(true);
      setError("");
      try {
        setPapers(await fetchPastPapers("ial", subject));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load papers.");
      } finally {
        setLoading(false);
      }
    };

    void loadPapers();
  }, [subject]);

  const toggleUnit = (unitId: string) => {
    setExpandedUnit(expandedUnit === unitId ? null : unitId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Link to="/ial-past-papers">
            <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to IAL Past Papers
            </Button>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              IAL Past Papers
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#1E3A8A] mb-4">
              {subjectName} <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">Papers</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Select a unit to view available past papers for {subjectName}.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {loading ? (
              <p className="text-center text-muted-foreground">Loading papers...</p>
            ) : error ? (
              <p className="rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center text-destructive">{error}</p>
            ) : units.length === 0 ? (
              <p className="rounded-xl border bg-card p-8 text-center text-muted-foreground">No papers have been added for this subject yet.</p>
            ) : (
              units.map((unit, index) => {
                const years = getPaperSessions(papers, unit.code);
                return (
                  <motion.div key={unit.code} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }}>
                    <div
                      onClick={() => toggleUnit(unit.code)}
                      className={`bg-card rounded-xl border-2 overflow-hidden transition-all cursor-pointer ${
                        expandedUnit === unit.code ? "border-[#1E3A8A] shadow-[0_8px_30px_rgba(250,204,21,0.3)]" : "border-border hover:border-[#1E3A8A]"
                      }`}
                    >
                      <div className="flex items-center gap-4 p-4">
                        <div className="w-12 h-12 rounded-lg bg-[#1E3A8A]/10 flex items-center justify-center">
                          <FileText className="w-6 h-6 text-[#1E3A8A]" />
                        </div>
                        <h3 className="font-heading font-bold text-xl text-[#1E3A8A] flex-1">{unit.name}</h3>
                        <ChevronDown className={`w-5 h-5 text-[#1E3A8A] transition-transform ${expandedUnit === unit.code ? "rotate-180" : ""}`} />
                      </div>

                      <AnimatePresence>
                        {expandedUnit === unit.code && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                            <div className="px-4 pb-4 space-y-2">
                              {years.map((year, yearIndex) => (
                                <Link key={`${unit.code}-${year}`} to={`/ial/${subject}/${encodeURIComponent(unit.name)}/${encodeURIComponent(year)}`}>
                                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-[#1E3A8A] hover:bg-muted/30 transition-all cursor-pointer group">
                                    <span className="text-muted-foreground text-sm w-6">{yearIndex + 1}.</span>
                                    <span className="font-medium text-foreground group-hover:text-[#1E3A8A] transition-colors">{year}</span>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IALPastPaperDetail;
