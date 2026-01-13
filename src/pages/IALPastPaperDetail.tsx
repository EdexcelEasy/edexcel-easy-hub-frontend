import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, FileText } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const subjectNames: Record<string, string> = {
  "physics": "Physics",
  "mathematics": "Mathematics",
  "biology": "Biology",
  "information-technology": "Information Technology",
};

const defaultYears = [
  "2025 - Nov",
  "2025 - June",
  "2024 - Nov",
  "2024 - June",
  "2023 - Nov",
  "2023 - June",
  "2022 - Jun",
  "2021 - Nov",
  "2021 - Jun",
  "2020 - Nov",
  "2019 - Jun",
];

const physicsYears = [
  "October 2025",
  "June 2025",
  "January 2025",
  "October 2024",
  "June 2024",
  "January 2024",
  "October 2023",
  "June 2023",
  "January 2023",
  "October 2022",
  "June 2022",
  "January 2022",
  "October 2021",
  "June 2021",
  "January 2021",
  "October 2020",
  "January 2020",
  "October 2019",
  "June 2019",
  "January 2019",
];

const mathsYears = [
  "October 2025",
  "June 2025",
  "January 2025",
  "October 2024",
  "June 2024",
  "January 2024",
  "October 2023",
  "June 2023",
  "January 2023",
  "October 2022",
  "June 2022",
  "January 2022",
  "October 2021",
  "June 2021",
  "January 2021",
  "October 2020",
  "January 2020",
  "October 2019",
  "June 2019",
  "January 2019",
];

const biologyYears = [
  "October 2025",
  "June 2025",
  "January 2025",
  "October 2024",
  "June 2024",
  "January 2024",
  "October 2023",
  "June 2023",
  "January 2023",
  "October 2022",
  "June 2022",
  "January 2022",
  "October 2021",
  "June 2021",
  "January 2021",
  "October 2020",
  "January 2020",
  "October 2019",
  "June 2019",
  "January 2019",
];

const itYears = [
  "June 2025",
  "June 2024",
  "June 2023",
  "June 2022",
  "October 2021",
  "June 2021",
  "October 2020",
  "June 2019",
];

const getYearsForSubject = (subject: string) => {
  if (subject === "physics") {
    return physicsYears;
  }
  if (subject === "mathematics") {
    return mathsYears;
  }
  if (subject === "biology") {
    return biologyYears;
  }
  if (subject === "information-technology") {
    return itYears;
  }
  return defaultYears;
};

const getUnitsForSubject = (subject: string) => {
  if (subject === "physics" || subject === "biology") {
    return [
      { name: "Unit 1", id: "unit-1" },
      { name: "Unit 2", id: "unit-2" },
      { name: "Unit 3", id: "unit-3" },
      { name: "Unit 4", id: "unit-4" },
      { name: "Unit 5", id: "unit-5" },
      { name: "Unit 6", id: "unit-6" },
    ];
  }
  if (subject === "mathematics") {
    return [
      { name: "P1", id: "p1" },
      { name: "P2", id: "p2" },
      { name: "P3", id: "p3" },
      { name: "P4", id: "p4" },
      { name: "M1", id: "m1" },
      { name: "S1", id: "s1" },
    ];
  }
  if (subject === "information-technology") {
    return [
      { name: "Unit 1", id: "unit-1" },
      { name: "Unit 2", id: "unit-2" },
      { name: "Unit 3", id: "unit-3" },
      { name: "Unit 4", id: "unit-4" },
    ];
  }
  return [];
};

const IALPastPaperDetail = () => {
  const { subject } = useParams<{ subject: string }>();
  const subjectName = subjectNames[subject || ""] || subject;
  const units = getUnitsForSubject(subject || "");
  const years = getYearsForSubject(subject || "");
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);

  const toggleUnit = (unitId: string) => {
    setExpandedUnit(expandedUnit === unitId ? null : unitId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/ial-past-papers">
            <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to IAL Past Papers
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
              IAL Past Papers
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#1E3A8A] mb-4">
              {subjectName}{" "}
              <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">
                Papers
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Select a unit to view available past papers for {subjectName}.
            </p>
          </motion.div>

          {/* Units Grid */}
          <div className="max-w-3xl mx-auto space-y-4">
            {units.map((unit, index) => (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div
                  onClick={() => toggleUnit(unit.id)}
                  className={`bg-card rounded-xl border-2 overflow-hidden transition-all cursor-pointer ${
                    expandedUnit === unit.id
                      ? "border-[#1E3A8A] shadow-[0_8px_30px_rgba(250,204,21,0.3)]"
                      : "border-border hover:border-[#1E3A8A]"
                  }`}
                >
                  {/* Unit Header */}
                  <div className="flex items-center gap-4 p-4">
                    <div className="w-12 h-12 rounded-lg bg-[#1E3A8A]/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-[#1E3A8A]" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-[#1E3A8A] flex-1">
                      {unit.name}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-[#1E3A8A] transition-transform ${
                        expandedUnit === unit.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Expanded Years List */}
                  <AnimatePresence>
                    {expandedUnit === unit.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 space-y-2">
                          {years.map((year, yearIndex) => (
                            <Link
                              key={`${unit.id}-${yearIndex}`}
                              to={`/ial/${subject}/${unit.name}/${encodeURIComponent(year)}`}
                            >
                              <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-[#1E3A8A] hover:bg-muted/30 transition-all cursor-pointer group">
                                <span className="text-muted-foreground text-sm w-6">
                                  {yearIndex + 1}.
                                </span>
                                <span className="font-medium text-foreground group-hover:text-[#1E3A8A] transition-colors">
                                  {year}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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

export default IALPastPaperDetail;
