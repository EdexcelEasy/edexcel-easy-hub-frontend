import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckSquare, Download, FileText, Video } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  fetchPastPapers,
  findPaperRecord,
  formatCurriculumName,
  formatSubjectName,
  type PastPaperRecord,
} from "@/lib/past-papers";

const PaperOptions = () => {
  const { curriculum, subject, paper, year } = useParams<{
    curriculum: string;
    subject: string;
    paper: string;
    year: string;
  }>();
  const [record, setRecord] = useState<PastPaperRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const decodedYear = decodeURIComponent(year || "");
  const decodedPaper = decodeURIComponent(paper || "");
  const curriculumValue = curriculum || "";
  const subjectValue = subject || "";
  const subjectName = formatSubjectName(subjectValue);
  const curriculumLabel = formatCurriculumName(curriculumValue);
  const backPath =
    curriculumValue === "ial"
      ? `/ial-past-papers/${subjectValue}`
      : curriculumValue === "igcse-modular"
      ? `/igcse-modular-past-papers/${subjectValue}`
      : `/igcse-past-papers/${subjectValue}`;

  useEffect(() => {
    const loadPaper = async () => {
      if (!curriculumValue || !subjectValue || !decodedPaper || !decodedYear) return;
      setLoading(true);
      setError("");
      try {
        const records = await fetchPastPapers(curriculumValue, subjectValue);
        setRecord(findPaperRecord(records, decodedPaper, decodedYear) || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load paper links.");
      } finally {
        setLoading(false);
      }
    };

    void loadPaper();
  }, [curriculumValue, decodedPaper, decodedYear, subjectValue]);

  const options = [
    {
      title: "Question Paper",
      description: record?.metadata?.qp_url ? "Click to open the examination question paper" : "Question paper not yet available",
      icon: FileText,
      type: "qp",
      href: record?.metadata?.qp_url || null,
      action: "Open PDF",
    },
    {
      title: "Mark Scheme",
      description: record?.metadata?.ms_url ? "Click to open the official mark scheme" : "Mark scheme not yet available",
      icon: CheckSquare,
      type: "ms",
      href: record?.metadata?.ms_url || null,
      action: "Open PDF",
    },
    ...(record?.metadata?.data_url ? [{
      title: "Data File",
      description: "Click to open the supporting data file",
      icon: FileText,
      type: "data",
      href: record.metadata.data_url,
      action: "Open File",
    }] : []),
    ...(record?.metadata?.video_url ? [{
      title: "Video",
      description: "Click to open the video explanation",
      icon: Video,
      type: "video",
      href: record.metadata.video_url,
      action: "Open Video",
    }] : []),
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Link to={backPath}>
            <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {subjectName} Papers
            </Button>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              {curriculumLabel} {subjectName}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#1E3A8A] mb-4">
              {decodedPaper} <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">{decodedYear}</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {loading ? "Loading paper links..." : "Choose the document you want to download."}
            </p>
          </motion.div>

          {error && (
            <p className="mx-auto mb-6 max-w-2xl rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center text-destructive">{error}</p>
          )}

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {options.map((option, index) =>
              option.href ? (
                <motion.a
                  key={option.type}
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-xl border-2 border-[#1E3A8A] p-6 hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] hover:border-[#FACC15] transition-all cursor-pointer group"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-xl bg-[#1E3A8A]/10 flex items-center justify-center mb-4 group-hover:bg-[#FACC15]/20 transition-colors">
                      <option.icon className="w-8 h-8 text-[#1E3A8A]" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-[#1E3A8A] mb-2">{option.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{option.description}</p>
                    <div className="flex items-center gap-2 text-[#1E3A8A] text-sm font-medium">
                      <Download className="w-4 h-4" />
                      <span>{option.action}</span>
                    </div>
                  </div>
                </motion.a>
              ) : (
                <motion.div
                  key={option.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-xl border-2 border-border p-6 opacity-60"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mb-4">
                      <option.icon className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-muted-foreground mb-2">{option.title}</h3>
                    <p className="text-muted-foreground text-sm">{option.description}</p>
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaperOptions;
