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
  "igcse-mathematics-a": {
    subjectName: "Mathematics A",
    units: [
      "Chapter 1: Algebra",
      "Chapter 2: Kinematics",
      "Chapter 3: Arithmetic",
      "Chapter 4: Functions",
      "Chapter 5: Vectors",
      "Chapter 6: Statistics",
      "Chapter 7: Sets",
      "Chapter 8: Probability",
      "Chapter 9: Trigonometry",
      "Chapter 10: Geometry",
      "Chapter 11: Mensuration",
      "Chapter 12: Equation Graph",
      "Chapter 13: Matrix",
    ],
  },
  "igcse-mathematics-b": {
    subjectName: "Mathematics B",
    units: [
      "Chapter 1: Algebra",
      "Chapter 2: Kinematics",
      "Chapter 3: Arithmetic",
      "Chapter 4: Functions",
      "Chapter 5: Vectors",
      "Chapter 6: Statistics",
      "Chapter 7: Sets",
      "Chapter 8: Probability",
      "Chapter 9: Trigonometry",
      "Chapter 10: Geometry",
      "Chapter 11: Mensuration",
      "Chapter 12: Equation Graph",
      "Chapter 13: Matrix",
    ],
  },
  "igcse-further-pure-mathematics": {
    subjectName: "Further Pure Mathematics",
    units: [
      "Chapter 1: Algebra",
      "Chapter 2: Logs",
      "Chapter 3: Calculus",
      "Chapter 4: AP/GP",
      "Chapter 5: Quadratic Equations",
      "Chapter 6: Binomial Expansion",
      "Chapter 7: Trigonometry",
      "Chapter 8: Mensuration",
      "Chapter 9: Coordinate Geometry",
      "Chapter 10: Equation Graph",
      "Chapter 11: Vector",
      "Chapter 12: Kinematics",
    ],
  },

  // ---- IAL Subjects ----
  "ial-physics": {
    subjectName: "Physics",
    units: [
      "Unit 1: Mechanics and Materials",
      "Unit 2: Waves and Electricity",
      "Unit 3: Practical Skills in Physics I",
      "Unit 4: Further Mechanics, Fields and Particles",
      "Unit 5: Thermodynamics, Radiation, Oscillations and Cosmology",
      "Unit 6: Practical Skills in Physics II",
    ],
  },
  "ial-mathematics": {
    subjectName: "Mathematics",
    units: [
      "Unit P1: Pure Mathematics 1",
      "Unit P2: Pure Mathematics 2",
      "Unit P3: Pure Mathematics 3",
      "Unit P4: Pure Mathematics 4",
      "Unit S1: Statistics 1",
      "Unit M1: Mechanics 1",
    ],
  },
  "ial-biology": {
    subjectName: "Biology",
    units: [
      "Unit 1: Lifestyle, Transport, Genes and Health",
      "Unit 2: Development, Plants and Environment",
      "Unit 3: Practical Biology and Research Skills I",
      "Unit 4: Energy, Environment and Microbiology",
      "Unit 5: Genetics, Evolution and Control",
      "Unit 6: Practical Biology and Research Skills II",
    ],
  },
  "ial-information-technology": {
    subjectName: "Information Technology",
    units: [
      "Unit 1: The Digital World",
      "Unit 2: Information Systems",
      "Unit 3: Website Development",
      "Unit 4: Software Design and Development",
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
              <Link key={unit} to={`/worksheets/${curriculum}/${subject}/unit/${index + 1}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  className="group relative bg-card rounded-xl border-2 border-[#1E3A8A] overflow-hidden hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] transition-all cursor-pointer"
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
                      <p className="text-muted-foreground text-xs mt-1">3 Worksheets Available</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WorksheetUnits;
