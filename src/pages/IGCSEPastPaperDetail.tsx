import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const subjectNames: Record<string, string> = {
  "physics": "Physics",
  "chemistry": "Chemistry",
  "mathematics-b": "Mathematics B",
  "mathematics-a": "Mathematics A",
  "further-pure-mathematics": "Further Pure Mathematics",
  "biology": "Biology",
  "human-biology": "Human Biology",
  "ict": "ICT",
  "computer-science": "Computer Science",
};

const paperYears = [
  "2025 - Nov",
  "2025 - June",
  "2024 - Nov",
  "2024 - June",
  "2023 - Nov",
  "2023 - June",
  "2023 - Jan",
  "2022 - Jun",
  "2022 - Jan",
  "2021 - Nov",
  "2021 - Jun",
  "2021 - Jan",
  "2020 - Nov",
  "2020 - Jan",
  "2019 - Jun",
];

const IGCSEPastPaperDetail = () => {
  const { subject } = useParams<{ subject: string }>();
  const subjectName = subjectNames[subject || ""] || subject;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/igcse-past-papers">
            <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to IGCSE Past Papers
            </Button>
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              IGCSE Past Papers
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#1E3A8A] mb-4">
              {subjectName}{" "}
              <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">
                Papers
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Access past examination papers for {subjectName}.
            </p>
          </motion.div>

          {/* Papers Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Paper 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-xl p-6 border-2 border-[#1E3A8A]"
            >
              <h2 className="font-heading font-bold text-2xl text-[#1E3A8A] mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#1E3A8A]/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#1E3A8A]" />
                </div>
                Paper 1
              </h2>
              <div className="space-y-2">
                {paperYears.map((year, index) => (
                  <motion.div
                    key={`paper1-${index}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-[#1E3A8A] hover:bg-muted/30 transition-all cursor-pointer group"
                  >
                    <span className="text-muted-foreground text-sm w-6">{index + 1}.</span>
                    <span className="font-medium text-foreground group-hover:text-[#1E3A8A] transition-colors">
                      {year}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Paper 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card rounded-xl p-6 border-2 border-[#1E3A8A]"
            >
              <h2 className="font-heading font-bold text-2xl text-[#1E3A8A] mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#1E3A8A]/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#1E3A8A]" />
                </div>
                Paper 2
              </h2>
              <div className="space-y-2">
                {paperYears.map((year, index) => (
                  <motion.div
                    key={`paper2-${index}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-[#1E3A8A] hover:bg-muted/30 transition-all cursor-pointer group"
                  >
                    <span className="text-muted-foreground text-sm w-6">{index + 1}.</span>
                    <span className="font-medium text-foreground group-hover:text-[#1E3A8A] transition-colors">
                      {year}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IGCSEPastPaperDetail;
