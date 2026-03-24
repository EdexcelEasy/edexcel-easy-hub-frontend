import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const worksheetData: Record<string, { subjectName: string; units: string[] }> = {
  "igcse-physics": {
    subjectName: "Physics",
    units: [
      "Unit 1: Forces and Motion",
      "Unit 2: Electricity",
      "Unit 3: Waves",
      "Unit 4: Energy Resources and Energy Transfer",
      "Unit 5: Solids, Liquids and Gases",
      "Unit 6: Magnetism and Electromagnetism",
      "Unit 7: Radioactivity and Particles",
      "Unit 8: Astrophysics",
    ],
  },
};

const WorksheetUnits = () => {
  const { curriculum, subject } = useParams<{ curriculum: string; subject: string }>();
  const key = `${curriculum}-${subject}`;
  const data = worksheetData[key];
  const subjectName = data?.subjectName || subject || "Unknown";
  const curriculumLabel = curriculum === "ial" ? "IAL" : curriculum === "igcse" ? "IGCSE" : "IGCSE Modular";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Link to={`/resources/${curriculum}/${subject}`}>
            <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {curriculumLabel} {subjectName} Resources
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              {curriculumLabel} {subjectName}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#1E3A8A] mb-4">
              Worksheets by{" "}
              <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">
                Unit
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Practice worksheets with worked solutions for every unit.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
            {data?.units.map((unit, index) => (
              <motion.div
                key={unit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className="group relative bg-card rounded-xl border-2 border-[#1E3A8A] overflow-hidden hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] transition-all"
              >
                <div className="h-2 bg-gradient-to-r from-green-500 to-green-700" />
                <div className="p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1E3A8A]/10 flex items-center justify-center shrink-0 group-hover:bg-[#1E3A8A] transition-colors">
                    <FileText className="w-6 h-6 text-[#1E3A8A] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-[#1E3A8A] text-base">
                      {unit}
                    </h3>
                    <p className="text-muted-foreground text-xs mt-1">Coming Soon</p>
                  </div>
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

export default WorksheetUnits;
