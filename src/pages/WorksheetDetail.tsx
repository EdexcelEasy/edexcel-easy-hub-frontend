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

  // Fetch free worksheet link from DB
  const { data: worksheetLinks } = useQuery({
    queryKey: ["worksheet-links", curriculum, subject, unit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("worksheet_links")
        .select("worksheet_number, link")
        .eq("curriculum", curriculum!)
        .eq("subject", subject!)
        .eq("unit", unit!);
      if (error) throw error;
      return data || [];
    },
    enabled: !!curriculum && !!subject && !!unit,
  });

  const getLink = (worksheetNumber: number) => {
    return worksheetLinks?.find((w) => w.worksheet_number === worksheetNumber)?.link || "";
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
