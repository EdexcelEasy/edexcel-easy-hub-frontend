import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Unit lists per IAL subject — used to render unit cards.
const ialUnits: Record<string, { subjectName: string; units: string[] }> = {
  physics: {
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
  biology: {
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
  mathematics: {
    subjectName: "Mathematics",
    units: [
      "Pure Mathematics 1 (P1)",
      "Pure Mathematics 2 (P2)",
      "Pure Mathematics 3 (P3)",
      "Pure Mathematics 4 (P4)",
      "Statistics 1 (S1)",
      "Mechanics 1 (M1)",
    ],
  },
  "information-technology": {
    subjectName: "Information Technology",
    units: [
      "Unit 1: The Digital World",
      "Unit 2: Information Systems",
      "Unit 3: Website Development",
      "Unit 4: Software Design and Development",
    ],
  },
};

const IALResourceUnits = () => {
  const { subject } = useParams<{ subject: string }>();
  const data = subject ? ialUnits[subject] : null;

  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-heading font-bold text-[#1E3A8A]">Subject not found</h1>
            <Link to="/ial-subjects">
              <Button variant="outline" className="mt-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to IAL Subjects
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Link to={`/ial/${subject}`}>
            <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to IAL {data.subjectName}
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              IAL {data.subjectName}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#1E3A8A] mb-4">
              Resources by{" "}
              <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">
                Unit
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Choose a unit to access its notes, videos, worksheets, formula booklet and cheatsheet.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
            {data.units.map((unit, index) => (
              <Link key={unit} to={`/resources/ial/${subject}/unit/${index + 1}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  className="group relative bg-card rounded-xl border-2 border-[#1E3A8A] overflow-hidden hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] transition-all cursor-pointer h-full"
                >
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-700" />
                  <div className="p-5 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1E3A8A]/10 flex items-center justify-center shrink-0 group-hover:bg-[#1E3A8A] transition-colors">
                      <BookOpen className="w-6 h-6 text-[#1E3A8A] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-[#1E3A8A] text-base">
                        {unit}
                      </h3>
                      <p className="text-muted-foreground text-xs mt-1">
                        Notes • Videos • Worksheets • Formula Booklet • Cheatsheet
                      </p>
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

export default IALResourceUnits;
