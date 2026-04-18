import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Video, FileText, Calculator, ScrollText, Lock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const resourceFolders = [
  {
    name: "Notes",
    description: "Comprehensive topic-by-topic study notes",
    icon: BookOpen,
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Videos",
    description: "Explained video lessons for every topic",
    icon: Video,
    color: "from-red-500 to-red-700",
  },
  {
    name: "Worksheets",
    description: "Practice worksheets with worked solutions",
    icon: FileText,
    color: "from-green-500 to-green-700",
  },
  {
    name: "Formula Booklet",
    description: "All key formulas in one handy reference",
    icon: Calculator,
    color: "from-purple-500 to-purple-700",
  },
  {
    name: "Cheatsheet",
    description: "Quick-revision summaries for last-minute prep",
    icon: ScrollText,
    color: "from-amber-500 to-amber-700",
  },
];

const ialUnitNames: Record<string, Record<string, string>> = {
  physics: {
    "1": "Mechanics and Materials",
    "2": "Waves and Electricity",
    "3": "Practical Skills in Physics I",
    "4": "Further Mechanics, Fields and Particles",
    "5": "Thermodynamics, Radiation, Oscillations and Cosmology",
    "6": "Practical Skills in Physics II",
  },
  biology: {
    "1": "Lifestyle, Transport, Genes and Health",
    "2": "Development, Plants and Environment",
    "3": "Practical Biology and Research Skills I",
    "4": "Energy, Environment and Microbiology",
    "5": "Genetics, Evolution and Control",
    "6": "Practical Biology and Research Skills II",
  },
  mathematics: {
    "1": "Pure Mathematics 1 (P1)",
    "2": "Pure Mathematics 2 (P2)",
    "3": "Pure Mathematics 3 (P3)",
    "4": "Pure Mathematics 4 (P4)",
    "5": "Statistics 1 (S1)",
    "6": "Mechanics 1 (M1)",
  },
  "information-technology": {
    "1": "The Digital World",
    "2": "Information Systems",
    "3": "Website Development",
    "4": "Software Design and Development",
  },
};

const subjectDisplayNames: Record<string, string> = {
  physics: "Physics",
  biology: "Biology",
  mathematics: "Mathematics",
  "information-technology": "Information Technology",
};

const IALUnitResources = () => {
  const { subject, unit } = useParams<{ subject: string; unit: string }>();
  const subjectName = subject ? subjectDisplayNames[subject] || subject : "Unknown";
  const unitName = subject && unit ? ialUnitNames[subject]?.[unit] || `Unit ${unit}` : "Unknown";
  const isWorksheetClickable = subject === "physics" || subject === "biology" || subject === "mathematics" || subject === "information-technology";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Link to={`/resources/ial/${subject}/units`}>
            <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to IAL {subjectName} Units
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              IAL {subjectName}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#1E3A8A] mb-4">
              {subject === "mathematics" ? "" : `Unit ${unit}: `}
              <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">
                {unitName}
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              All resources for this unit.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourceFolders.map((folder, index) => {
              const cardContent = (
                <div className="group relative bg-card rounded-xl border-2 border-[#1E3A8A] overflow-hidden hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] transition-all cursor-pointer h-full">
                  <div className={`h-2 bg-gradient-to-r ${folder.color}`} />
                  <div className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-[#1E3A8A]/10 flex items-center justify-center mb-4 group-hover:bg-[#1E3A8A] transition-colors">
                      <folder.icon className="w-7 h-7 text-[#1E3A8A] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-[#1E3A8A] mb-1">
                      {folder.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {folder.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[#FACC15] font-semibold">
                      <Lock className="w-3.5 h-3.5" />
                      {folder.name === "Cheatsheet" ? "Paid Only" : "Coming Soon"}
                    </div>
                  </div>
                </div>
              );

              return (
                <motion.div
                  key={folder.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {folder.name === "Cheatsheet" ? (
                    <Link to="/cheatsheets">{cardContent}</Link>
                  ) : folder.name === "Worksheets" && isWorksheetClickable ? (
                    <Link to={`/worksheets/ial/${subject}/unit/${unit}`}>{cardContent}</Link>
                  ) : cardContent}
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default IALUnitResources;
