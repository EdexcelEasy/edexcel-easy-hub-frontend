import { motion } from "framer-motion";
import { ArrowLeft, FileText, Lock, Unlock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const unitNamesMap: Record<string, Record<string, string>> = {
  physics: {
    "1": "Forces and Motion",
    "2": "Electricity",
    "3": "Waves",
    "4": "Energy Resources and Energy Transfer",
    "5": "Solids, Liquids and Gases",
    "6": "Magnetism and Electromagnetism",
    "7": "Radioactivity and Particles",
    "8": "Astrophysics",
  },
  "mathematics-a": {
    "1": "Algebra",
    "2": "Kinematics",
    "3": "Arithmetic",
    "4": "Functions",
    "5": "Vectors",
    "6": "Statistics",
    "7": "Sets",
    "8": "Probability",
    "9": "Trigonometry",
    "10": "Geometry",
    "11": "Mensuration",
    "12": "Equation Graph",
    "13": "Matrix",
  },
  "mathematics-b": {
    "1": "Algebra",
    "2": "Kinematics",
    "3": "Arithmetic",
    "4": "Functions",
    "5": "Vectors",
    "6": "Statistics",
    "7": "Sets",
    "8": "Probability",
    "9": "Trigonometry",
    "10": "Geometry",
    "11": "Mensuration",
    "12": "Equation Graph",
    "13": "Matrix",
  },
  // ---- IAL Subjects ----
  "ial-physics": {
    "1": "Mechanics and Materials",
    "2": "Waves and Electricity",
    "3": "Practical Skills in Physics I",
    "4": "Further Mechanics, Fields and Particles",
    "5": "Thermodynamics, Radiation, Oscillations and Cosmology",
    "6": "Practical Skills in Physics II",
  },
  "ial-mathematics": {
    "1": "Pure Mathematics 1 (P1)",
    "2": "Pure Mathematics 2 (P2)",
    "3": "Pure Mathematics 3 (P3)",
    "4": "Pure Mathematics 4 (P4)",
    "5": "Statistics 1 (S1)",
    "6": "Mechanics 1 (M1)",
  },
  "ial-biology": {
    "1": "Lifestyle, Transport, Genes and Health",
    "2": "Development, Plants and Environment",
    "3": "Practical Biology and Research Skills I",
    "4": "Energy, Environment and Microbiology",
    "5": "Genetics, Evolution and Control",
    "6": "Practical Biology and Research Skills II",
  },
  "ial-information-technology": {
    "1": "The Digital World",
    "2": "Information Systems",
    "3": "Website Development",
    "4": "Software Design and Development",
  },
};


// =====================================================================
// FREE WORKSHEET 1 LINKS
// Format: "curriculum/subject/unit" → URL
// Add your links here. Leave empty string "" if not yet available.
// =====================================================================
const worksheetFreeLinks: Record<string, string> = {
  // ---- IGCSE Physics (Units 1–8) ----
  "igcse/physics/1": "https://shorturl.at/6pv5G", // Forces and Motion — PLACEHOLDER, update if needed
  "igcse/physics/2": "", // Electricity
  "igcse/physics/3": "", // Waves
  "igcse/physics/4": "", // Energy Resources and Energy Transfer
  "igcse/physics/5": "", // Solids, Liquids and Gases
  "igcse/physics/6": "", // Magnetism and Electromagnetism
  "igcse/physics/7": "", // Radioactivity and Particles
  "igcse/physics/8": "", // Astrophysics

  // ---- IGCSE Mathematics A (Chapters 1–13) ----
  "igcse/mathematics-a/1": "https://shorturl.at/6pv5G", // Algebra
  "igcse/mathematics-a/2": "", // Kinematics
  "igcse/mathematics-a/3": "", // Arithmetic
  "igcse/mathematics-a/4": "", // Functions
  "igcse/mathematics-a/5": "", // Vectors
  "igcse/mathematics-a/6": "", // Statistics
  "igcse/mathematics-a/7": "", // Sets
  "igcse/mathematics-a/8": "", // Probability
  "igcse/mathematics-a/9": "", // Trigonometry
  "igcse/mathematics-a/10": "", // Geometry
  "igcse/mathematics-a/11": "", // Mensuration
  "igcse/mathematics-a/12": "", // Equation Graph
  "igcse/mathematics-a/13": "", // Matrix

  // ---- IGCSE Mathematics B (Chapters 1–13) ----
  "igcse/mathematics-b/1": "", // Algebra
  "igcse/mathematics-b/2": "", // Kinematics
  "igcse/mathematics-b/3": "", // Arithmetic
  "igcse/mathematics-b/4": "", // Functions
  "igcse/mathematics-b/5": "", // Vectors
  "igcse/mathematics-b/6": "", // Statistics
  "igcse/mathematics-b/7": "", // Sets
  "igcse/mathematics-b/8": "", // Probability
  "igcse/mathematics-b/9": "", // Trigonometry
  "igcse/mathematics-b/10": "", // Geometry
  "igcse/mathematics-b/11": "", // Mensuration
  "igcse/mathematics-b/12": "", // Equation Graph
  "igcse/mathematics-b/13": "", // Matrix

  // ---- IGCSE Chemistry (Units 1–8) ----
  "igcse/chemistry/1": "",
  "igcse/chemistry/2": "",
  "igcse/chemistry/3": "",
  "igcse/chemistry/4": "",
  "igcse/chemistry/5": "",
  "igcse/chemistry/6": "",
  "igcse/chemistry/7": "",
  "igcse/chemistry/8": "",

  // ---- IGCSE Biology (Units 1–8) ----
  "igcse/biology/1": "",
  "igcse/biology/2": "",
  "igcse/biology/3": "",
  "igcse/biology/4": "",
  "igcse/biology/5": "",
  "igcse/biology/6": "",
  "igcse/biology/7": "",
  "igcse/biology/8": "",

  // ---- IGCSE Human Biology (Units 1–8) ----
  "igcse/human-biology/1": "",
  "igcse/human-biology/2": "",
  "igcse/human-biology/3": "",
  "igcse/human-biology/4": "",
  "igcse/human-biology/5": "",
  "igcse/human-biology/6": "",
  "igcse/human-biology/7": "",
  "igcse/human-biology/8": "",

  // ---- IGCSE ICT (Units 1–8) ----
  "igcse/ict/1": "",
  "igcse/ict/2": "",
  "igcse/ict/3": "",
  "igcse/ict/4": "",
  "igcse/ict/5": "",
  "igcse/ict/6": "",
  "igcse/ict/7": "",
  "igcse/ict/8": "",

  // ---- IGCSE Computer Science (Units 1–8) ----
  "igcse/computer-science/1": "",
  "igcse/computer-science/2": "",
  "igcse/computer-science/3": "",
  "igcse/computer-science/4": "",
  "igcse/computer-science/5": "",
  "igcse/computer-science/6": "",
  "igcse/computer-science/7": "",
  "igcse/computer-science/8": "",

  // ---- IGCSE Further Pure Mathematics (Units 1–8) ----
  "igcse/further-pure-mathematics/1": "",
  "igcse/further-pure-mathematics/2": "",
  "igcse/further-pure-mathematics/3": "",
  "igcse/further-pure-mathematics/4": "",
  "igcse/further-pure-mathematics/5": "",
  "igcse/further-pure-mathematics/6": "",
  "igcse/further-pure-mathematics/7": "",
  "igcse/further-pure-mathematics/8": "",
};

const worksheets = [
  {
    title: "Worksheet 1",
    description: "Contains questions from Jun 2019 – Nov 2020 Paper 1",
    isFree: true,
  },
  {
    title: "Worksheet 2",
    description: "Contains questions from Jan 2021 – Nov 2025 Paper 1 and Paper 1R",
    isFree: false,
  },
  {
    title: "Worksheet 3",
    description: "Contains questions from Jun 2019 – Nov 2025 Paper 2 and Paper 2R",
    isFree: false,
  },
];

const WorksheetDetail = () => {
  const { curriculum, subject, unit } = useParams<{
    curriculum: string;
    subject: string;
    unit: string;
  }>();

  // Get free worksheet 1 link from the hardcoded map
  const getLink = (worksheetNumber: number) => {
    if (worksheetNumber !== 1) return "";
    const key = `${curriculum}/${subject}/${unit}`;
    return worksheetFreeLinks[key] || "";
  };

  const subjectUnitNames = subject ? unitNamesMap[subject] : null;
  const unitName = unit && subjectUnitNames ? subjectUnitNames[unit] || `Unit ${unit}` : "Unknown";
  const curriculumLabel =
    curriculum === "ial" ? "IAL" : curriculum === "igcse" ? "IGCSE" : "IGCSE Modular";
  const subjectNames: Record<string, string> = {
    physics: "Physics",
    "mathematics-a": "Mathematics A",
    "mathematics-b": "Mathematics B",
  };
  const subjectName = subject ? subjectNames[subject] || subject : "Unknown";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Link to={`/worksheets/${curriculum}/${subject}`}>
            <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {curriculumLabel} {subjectName} Worksheets
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
              {subject?.startsWith("mathematics") ? "Chapter" : "Unit"} {unit}:{" "}
              <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">
                {unitName}
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Select a worksheet to practice.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
            {worksheets.map((ws, index) => {
              const cardContent = (
                <motion.div
                  key={ws.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative bg-card rounded-xl border-2 border-[#1E3A8A] overflow-hidden hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] transition-all cursor-pointer"
                >
                  <div
                    className={`h-2 bg-gradient-to-r ${
                      ws.isFree ? "from-green-500 to-green-700" : "from-amber-500 to-amber-700"
                    }`}
                  />
                  <div className="p-6 flex flex-col items-center text-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        ws.isFree ? "bg-green-500/10" : "bg-amber-500/10"
                      } group-hover:bg-[#1E3A8A] transition-colors`}
                    >
                      <FileText className="w-7 h-7 text-[#1E3A8A] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-[#1E3A8A] text-lg mb-2">
                        {ws.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">{ws.description}</p>
                      <Badge
                        className={
                          ws.isFree
                            ? "bg-green-500/10 text-green-700 border-green-500/30 hover:bg-green-500/20"
                            : "bg-amber-500/10 text-amber-700 border-amber-500/30 hover:bg-amber-500/20"
                        }
                      >
                        {ws.isFree ? (
                          <>
                            <Unlock className="w-3 h-3 mr-1" /> Free
                          </>
                        ) : (
                          <>
                            <Lock className="w-3 h-3 mr-1" /> Paid
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              );

              const worksheetNumber = index + 1;
              const freeLink = ws.isFree ? getLink(worksheetNumber) : "";

              if (!ws.isFree) {
                return (
                  <a
                    key={ws.title}
                    href="https://wa.me/message/WK334XB54YYRL1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {cardContent}
                  </a>
                );
              }

              if (freeLink) {
                return (
                  <a
                    key={ws.title}
                    href={freeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {cardContent}
                  </a>
                );
              }

              return <div key={ws.title} className="opacity-60 cursor-not-allowed">{cardContent}</div>;
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WorksheetDetail;
