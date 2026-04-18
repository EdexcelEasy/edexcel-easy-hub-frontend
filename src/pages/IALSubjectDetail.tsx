import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Download, BookOpen } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ============================================================
// 📚 IAL TEXTBOOK LINKS — EDIT HERE
// ------------------------------------------------------------
// Paste the Google Drive (or any) PDF URL between the quotes.
// Leave as "" to show "Coming soon" on the site.
// ============================================================
const textbookLinks: Record<string, { book1: string; book2: string }> = {
  physics: {
    book1: "https://drive.google.com/file/d/1F33YiFDTVeEOu2rtR8qC_SepXaXBuWCz/view?usp=share_link",
    book2: "",
  },
  mathematics: {
    book1: "",
    book2: "",
  },
  biology: {
    book1: "",
    book2: "",
  },
  "information-technology": {
    book1: "",
    book2: "",
  },
};
// ============================================================

// Subject specifications data
const subjectSpecs: Record<string, { name: string; topics: { unit: string; topics: string[] }[] }> = {
  physics: {
    name: "Physics",
    topics: [
      {
        unit: "Unit 1: Mechanics and Materials",
        topics: [
          "Rectilinear motion",
          "Forces",
          "Energy and power",
          "Materials",
          "Momentum",
        ],
      },
      {
        unit: "Unit 2: Waves and Electricity",
        topics: [
          "Wave properties",
          "EM spectrum and photons",
          "Superposition",
          "DC electricity",
          "Nature of light",
        ],
      },
      {
        unit: "Unit 3: Practical Skills in Physics I",
        topics: [
          "Planning and implementation",
          "Analysis and evaluation",
          "Practical techniques",
        ],
      },
      {
        unit: "Unit 4: Further Mechanics, Fields and Particles",
        topics: [
          "Further mechanics",
          "Electric and magnetic fields",
          "Nuclear and particle physics",
        ],
      },
      {
        unit: "Unit 5: Thermodynamics, Radiation, Oscillations and Cosmology",
        topics: [
          "Thermodynamics",
          "Nuclear radiation",
          "Oscillations",
          "Astrophysics and cosmology",
        ],
      },
      {
        unit: "Unit 6: Practical Skills in Physics II",
        topics: [
          "Advanced practical skills",
          "Data analysis",
          "Scientific methodology",
        ],
      },
    ],
  },
  mathematics: {
    name: "Mathematics",
    topics: [
      {
        unit: "Unit P1: Pure Mathematics 1",
        topics: [
          "Algebra and functions",
          "Coordinate geometry",
          "Differentiation",
          "Integration",
          "Proof",
        ],
      },
      {
        unit: "Unit P2: Pure Mathematics 2",
        topics: [
          "Trigonometry",
          "Exponentials and logarithms",
          "Sequences and series",
          "Further algebra",
        ],
      },
      {
        unit: "Unit P3: Pure Mathematics 3",
        topics: [
          "Further calculus",
          "Numerical methods",
          "Vectors",
        ],
      },
      {
        unit: "Unit P4: Pure Mathematics 4",
        topics: [
          "Further functions",
          "Further coordinate geometry",
          "Further differential equations",
        ],
      },
      {
        unit: "Unit S1: Statistics 1",
        topics: [
          "Mathematical modelling",
          "Representation of data",
          "Probability",
          "Correlation and regression",
          "Discrete random variables",
        ],
      },
      {
        unit: "Unit M1: Mechanics 1",
        topics: [
          "Mathematical models in mechanics",
          "Kinematics of a particle",
          "Dynamics of a particle",
          "Statics and forces",
          "Moments",
        ],
      },
    ],
  },
  biology: {
    name: "Biology",
    topics: [
      {
        unit: "Unit 1: Lifestyle, Transport, Genes and Health",
        topics: [
          "Cardiovascular disease",
          "Diet and health",
          "Transport in plants and animals",
          "DNA and protein synthesis",
          "Cell division and cancer",
        ],
      },
      {
        unit: "Unit 2: Development, Plants and Environment",
        topics: [
          "Cell differentiation",
          "Plant structure and function",
          "Biodiversity and classification",
          "Climate change",
          "Conservation",
        ],
      },
      {
        unit: "Unit 3: Practical Biology and Research Skills I",
        topics: [
          "Practical skills",
          "Research methodology",
          "Data analysis",
        ],
      },
      {
        unit: "Unit 4: Energy, Environment and Microbiology",
        topics: [
          "Photosynthesis",
          "Respiration",
          "Energy and ecosystems",
          "Microbiology and pathogens",
          "Immunity",
        ],
      },
      {
        unit: "Unit 5: Genetics, Evolution and Control",
        topics: [
          "Genetics",
          "Evolution",
          "Nervous system",
          "Homeostasis",
          "Gene expression",
        ],
      },
      {
        unit: "Unit 6: Practical Biology and Research Skills II",
        topics: [
          "Advanced practical skills",
          "Investigative biology",
          "Scientific communication",
        ],
      },
    ],
  },
  "information-technology": {
    name: "Information Technology",
    topics: [
      {
        unit: "Unit 1: The Digital World",
        topics: [
          "Digital devices and connectivity",
          "Living in a digital world",
          "Implications of technology",
          "IT systems and security",
        ],
      },
      {
        unit: "Unit 2: Information Systems",
        topics: [
          "Spreadsheet modelling",
          "Database development",
          "Data analysis and manipulation",
          "Automated document production",
        ],
      },
      {
        unit: "Unit 3: Website Development",
        topics: [
          "Web design principles",
          "HTML and CSS",
          "Multimedia content",
          "Testing and evaluation",
        ],
      },
      {
        unit: "Unit 4: Software Design and Development",
        topics: [
          "Programming concepts",
          "Software development lifecycle",
          "Testing strategies",
          "Documentation",
        ],
      },
    ],
  },
};

const IALSubjectDetail = () => {
  const { subject } = useParams<{ subject: string }>();
  const subjectData = subject ? subjectSpecs[subject] : null;
  const books = (subject && textbookLinks[subject]) || { book1: "", book2: "" };

  if (!subjectData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-heading font-bold text-[#1E3A8A]">Subject not found</h1>
            <Link to="/ial-subjects">
              <Button variant="outline" className="mt-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Subjects
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
          {/* Back Button */}
          <Link to="/ial-subjects">
            <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to IAL Subjects
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
              IAL {subjectData.name}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#1E3A8A] mb-4">
              {subjectData.name}{" "}
              <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">
                Specification
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Explore the complete syllabus topics for IAL {subjectData.name}.
            </p>
          </motion.div>

          {/* Resource Cards */}
          <div className="max-w-3xl mx-auto grid grid-cols-2 gap-4 mb-8">
            <Link to={`/resources/ial/${subject}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#1E3A8A] rounded-xl p-5 cursor-pointer hover:bg-[#1E3A8A]/90 transition-colors"
              >
                <h4 className="font-heading font-bold text-white text-base md:text-lg">
                  Available Resources
                </h4>
                <p className="text-white/80 text-sm mt-1">
                  Notes, videos, worksheets, formula booklet & cheatsheet
                </p>
              </motion.div>
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#1E3A8A] rounded-xl p-5 cursor-pointer hover:bg-[#1E3A8A]/90 transition-colors"
            >
              <h4 className="font-heading font-bold text-white text-base md:text-lg">
                Quick Stats
              </h4>
              <p className="text-white/80 text-sm mt-1">
                {subjectData.topics.length} units • {subjectData.topics.reduce((acc, unit) => acc + unit.topics.length, 0)} topics
              </p>
            </motion.div>
          </div>

          {/* Download Specification Card */}
          {["physics", "mathematics", "biology", "information-technology"].includes(subject || "") && (
            <motion.a
              href={
                subject === "physics" ? "/specs/ial-physics-specification.pdf" :
                subject === "mathematics" ? "/specs/ial-maths-specification.pdf" :
                subject === "biology" ? "/specs/ial-biology-specification.pdf" :
                "/specs/ial-it-specification.pdf"
              }
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="max-w-3xl mx-auto mb-8 block"
            >
              <div className="bg-card rounded-xl border-2 border-[#FACC15] p-5 flex items-center justify-between hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] hover:border-[#1E3A8A] transition-all cursor-pointer group">
                <div>
                  <h4 className="font-heading font-bold text-[#1E3A8A] text-base md:text-lg">
                    Download the Official Pearson Specification
                  </h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    Complete IAL {subjectData?.name} syllabus document (PDF)
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-[#FACC15]/20 flex items-center justify-center group-hover:bg-[#FACC15] transition-colors">
                  <Download className="w-6 h-6 text-[#1E3A8A]" />
                </div>
              </div>
            </motion.a>
          )}

          {/* Textbooks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-3xl mx-auto mb-10"
          >
            <h3 className="font-heading font-bold text-xl text-[#1E3A8A] mb-4 text-center">
              Textbooks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2].map((num) => {
                const book = textbooks.find((t) => t.book_number === num);
                const hasLink = book && book.link && book.link.trim() !== "";
                const title = book?.title || `Book ${num}`;
                const content = (
                  <div
                    className={`bg-card rounded-xl border-2 border-[#1E3A8A] p-5 flex items-center justify-between transition-all h-full ${
                      hasLink
                        ? "hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] hover:border-[#FACC15] cursor-pointer group"
                        : "opacity-60"
                    }`}
                  >
                    <div>
                      <h4 className="font-heading font-bold text-[#1E3A8A] text-base md:text-lg">
                        {title}
                      </h4>
                      <p className="text-muted-foreground text-sm mt-1">
                        {hasLink ? "Download the official textbook (PDF)" : "Coming soon"}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                        hasLink
                          ? "bg-[#FACC15]/20 group-hover:bg-[#FACC15]"
                          : "bg-muted"
                      }`}
                    >
                      <BookOpen className="w-6 h-6 text-[#1E3A8A]" />
                    </div>
                  </div>
                );
                return hasLink ? (
                  <a
                    key={num}
                    href={book!.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={num}>{content}</div>
                );
              })}
            </div>
          </motion.div>

          {/* Topics */}
          <div className="max-w-3xl mx-auto space-y-6">
            {subjectData.topics.map((unit, index) => (
              <motion.div
                key={unit.unit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                className="bg-card rounded-xl border-2 border-[#1E3A8A] overflow-hidden hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] transition-all"
              >
                <div className="bg-[#1E3A8A]/5 px-6 py-4 border-b border-[#1E3A8A]">
                  <h2 className="font-heading font-bold text-lg text-[#1E3A8A]">
                    {unit.unit}
                  </h2>
                </div>
                <div className="p-6">
                  <ul className="space-y-2">
                    {unit.topics.map((topic) => (
                      <li key={topic} className="flex items-center gap-3 text-muted-foreground hover:text-[#1E3A8A] transition-colors cursor-pointer">
                        <ChevronRight className="w-4 h-4 text-[#FACC15]" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
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

export default IALSubjectDetail;
