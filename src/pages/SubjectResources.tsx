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
    description: "Explained video lessons for every chapter",
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

const subjectNames: Record<string, string> = {
  physics: "Physics",
  chemistry: "Chemistry",
  biology: "Biology",
  mathematics: "Mathematics",
  "mathematics-a": "Mathematics A",
  "mathematics-b": "Mathematics B",
  "further-pure-mathematics": "Further Pure Mathematics",
  "computer-science": "Computer Science",
  ict: "ICT",
  "human-biology": "Human Biology",
  "information-technology": "Information Technology",
  accounting: "Accounting",
  "english-language-b": "English Language B",
  "science-double-awards": "Science (Double Awards)",
};

const SubjectResources = () => {
  const { curriculum, subject } = useParams<{ curriculum: string; subject: string }>();
  const subjectName = subject ? subjectNames[subject] || subject : "Unknown";
  const curriculumLabel = curriculum === "ial" ? "IAL" : curriculum === "igcse" ? "IGCSE" : "IGCSE Modular";
  const backPath = curriculum === "ial" ? `/ial/${subject}` : `/igcse/${subject}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Link to={backPath}>
            <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {curriculumLabel} {subjectName}
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
              Available{" "}
              <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">
                Resources
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Access all study materials for {curriculumLabel} {subjectName}.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourceFolders.map((folder, index) => {
              const cardContent = (
                <div className="group relative bg-card rounded-xl border-2 border-[#1E3A8A] overflow-hidden hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] transition-all cursor-pointer">
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

              const isWorksheetClickable = folder.name === "Worksheets" && curriculum === "igcse" && (subject === "physics" || subject === "mathematics-a" || subject === "mathematics-b" || subject === "further-pure-mathematics");

              const isCheatsheet = folder.name === "Cheatsheet";
              const labelText = isCheatsheet
                ? "Paid Only"
                : isWorksheetClickable
                ? "Click for more"
                : "Coming Soon";
              const labelColor = isCheatsheet ? "text-red-600" : "text-[#FACC15]";

              const renderedCard = (
                <div className="group relative bg-card rounded-xl border-2 border-[#1E3A8A] overflow-hidden hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] transition-all cursor-pointer">
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
                    <div className={`flex items-center gap-2 text-xs ${labelColor} font-semibold`}>
                      <Lock className="w-3.5 h-3.5" />
                      {labelText}
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
                    <Link to="/cheatsheets">{renderedCard}</Link>
                  ) : isWorksheetClickable ? (
                    <Link to={`/worksheets/${curriculum}/${subject}`}>{renderedCard}</Link>
                  ) : renderedCard}
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

export default SubjectResources;
