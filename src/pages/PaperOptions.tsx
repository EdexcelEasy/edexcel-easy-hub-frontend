import { motion } from "framer-motion";
import { ArrowLeft, FileText, CheckSquare, Download } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const igcseSubjectNames: Record<string, string> = {
  physics: "Physics",
  chemistry: "Chemistry",
  "mathematics-b": "Mathematics B",
  "mathematics-a": "Mathematics A",
  "further-pure-mathematics": "Further Pure Mathematics",
  biology: "Biology",
  "human-biology": "Human Biology",
  ict: "ICT",
  "computer-science": "Computer Science",
};

const ialSubjectNames: Record<string, string> = {
  physics: "Physics",
  mathematics: "Mathematics",
  biology: "Biology",
  "information-technology": "Information Technology",
};

// Map year strings to folder names
const getYearFolder = (year: string): string => {
  // Handle formats like "2019 - Jun", "2019 - Jun R", "June 2019", etc.
  const normalized = year.toLowerCase();

  if (normalized.includes("2024") && normalized.includes("jun")) {
    if (normalized.includes("r")) {
      return "2024-jun-r";
    }
    return "2024-jun";
  }
  if (normalized.includes("2019") && normalized.includes("jun")) {
    if (normalized.includes("r")) {
      return "2019-jun-r";
    }
    return "2019-jun";
  }
  
  if (normalized.includes("2024") && normalized.includes("nov")) {
    return "2024-nov";
  }

   if (normalized.includes("2023") && normalized.includes("nov")) {
    return "2023-nov";
  }

  if (normalized.includes("2023") && normalized.includes("jun")) {
    if (normalized.includes("r")) {
      return "2023-jun-r";
    }
    return "2023-jun";
  }

  if (normalized.includes("2023") && normalized.includes("jan")) {
    if (normalized.includes("r")) {
      return "2023-jan-r";
    }
    return "2023-jan";
  }

  if (normalized.includes("2022") && normalized.includes("jan")) {
    if (normalized.includes("r")) {
      return "2022-jan-r";
    }
    return "2022-jan";
  }

  if (normalized.includes("2022") && normalized.includes("jun")) {
    if (normalized.includes("r")) {
      return "2022-jun-r";
    }
    return "2022-jun";
  }

  if (normalized.includes("2021") && normalized.includes("nov")) {
    return "2021-nov";
  }

  if (normalized.includes("2021") && normalized.includes("jan")) {
    if (normalized.includes("r")) {
      return "2021-jan-r";
    }
    return "2021-jan";
  }

  if (normalized.includes("2021") && normalized.includes("jun")) {
    return "2021-jun";
  }

  if (normalized.includes("2020") && normalized.includes("jan")) {
    if (normalized.includes("r")) {
      return "2020-jan-r";
    }
    return "2020-jan";
  }

  if (normalized.includes("2020") && normalized.includes("nov")) {
    if (normalized.includes("r")) {
      return "2020-nov-r";
    }
    return "2020-nov";
  }

  
};

// Map paper names to file prefixes
const getPaperPrefix = (paper: string): string => {
  const normalized = paper.toLowerCase();
  if (normalized.includes("paper 1") || normalized.includes("p1") || normalized === "unit 1") {
    return "paper1";
  }
  if (normalized.includes("paper 2") || normalized.includes("p2") || normalized === "unit 2") {
    return "paper2";
  }
  // Add more mappings for other papers/units
  return "";
};

// External URLs for papers (when not stored locally)
const externalPaperUrls: Record<string, { qp?: string; ms?: string }> = {
  "igcse/ict/2024-jun/paper1": {
    qp: "https://rb.gy/uefdwy",
    ms: "https://shorturl.at/O96Tb",
  },
  "igcse/ict/2024-jun/paper2": {
    qp: "https://drive.google.com/file/d/1YMuWTROhKMkxaKRD68Wr8ilQvMUcuHDE/view",
  },
  "igcse/physics/2024-nov/paper1": {
    ms: "https://url-shortener.me/GJLP",
  },

  // IGCSE Physics Papers: 
// IGCSE Physics 2024 June Paper 1  
  "igcse/physics/2024-jun/paper1": {
    qp: "https://shorturl.at/tjucK",
    ms: "https://url-shortener.me/GJIA",
  },
// IGCSE Physics 2024 June Paper 1R
  "igcse/physics/2024-jun-r/paper1": {
    qp: "https://url-shortener.me/GJDA",
    ms: "https://url-shortener.me/GJIA",
  },
// IGCSE Physics 2024 June Paper 2
 "igcse/physics/2024-jun/paper2": {
    qp: "https://url-shortener.me/GJKO",
    ms: "https://url-shortener.me/GJKT",
  },

// IGCSE Physics 2024 June Paper 2R
 "igcse/physics/2024-jun-r/paper2": {
    qp: "https://url-shortener.me/GJL4",
    ms: "https://url-shortener.me/GJL8",
  },


// IGCSE Physics 2024 Nov Paper 1
 "igcse/physics/2024-nov/paper1": {
    qp: "https://url-shortener.me/GJLC",
    ms: "https://url-shortener.me/GJLD",
  },

// IGCSE Physics 2024 Nov Paper 2
 "igcse/physics/2024-nov/paper2": {
    qp: "https://url-shortener.me/GJLK",
    ms: "https://url-shortener.me/GJLP",
  },

// IGCSE Physics 2023 Nov Paper 1
 "igcse/physics/2023-nov/paper1": {
    qp: "https://url-shortener.me/GJT0",
    ms: "https://url-shortener.me/GJT3",
  },


// IGCSE Physics 2023 Nov Paper 2
 "igcse/physics/2023-nov/paper2": {
    qp: "https://url-shortener.me/GJT7",
    ms: "https://url-shortener.me/GJT8",
  },

// IGCSE Physics 2023 Jun Paper 1
 "igcse/physics/2023-jun/paper1": {
    qp: "https://url-shortener.me/GKCX",
    ms: "https://url-shortener.me/GJTD",
  },

// IGCSE Physics 2023 Jun Paper 1R
 "igcse/physics/2023-jun-r/paper1": {
    qp: "https://url-shortener.me/GJTK",
    ms: "https://url-shortener.me/GJTL",
  },


// IGCSE Physics 2023 Jun Paper 2
 "igcse/physics/2023-jun/paper2": {
    qp: "https://url-shortener.me/GJU1",
    ms: "https://url-shortener.me/GJU3",
  },

// IGCSE Physics 2023 Jun Paper 2R
 "igcse/physics/2023-jun-r/paper2": {
    qp: "https://url-shortener.me/GJUV",
    ms: "https://url-shortener.me/GJUY",
  },

// IGCSE Physics 2023 Jan Paper 1
 "igcse/physics/2023-jan/paper1": {
    qp: "https://url-shortener.me/GK5J",
    ms: "https://url-shortener.me/GK5N",
  },

// IGCSE Physics 2023 Jan Paper 1R
 "igcse/physics/2023-jan-r/paper1": {
    qp: "https://url-shortener.me/GK61",
    ms: "https://url-shortener.me/GK66",
  },

// IGCSE Physics 2023 Jan Paper 2
 "igcse/physics/2023-jan/paper2": {
    qp: "https://url-shortener.me/GK6A",
    ms: "https://url-shortener.me/GK6C",
  },

// IGCSE Physics 2023 Jan Paper 2R
"igcse/physics/2023-jan-r/paper2": {
    qp: "https://url-shortener.me/GK6I",
    ms: "https://url-shortener.me/GK6N",
  },

// IGCSE Physics 2022 Jun Paper 1
 "igcse/physics/2022-jun/paper1": {
    qp: "https://url-shortener.me/GKBK",
    ms: "https://url-shortener.me/GKBP",
  },

// IGCSE Physics 2022 Jun Paper 1R
 "igcse/physics/2022-jun-r/paper1": {
    qp: "https://url-shortener.me/GKBU",
    ms: "https://url-shortener.me/GKBY",
  },


// IGCSE Physics 2022 Jun Paper 2
 "igcse/physics/2022-jun/paper2": {
    qp: "https://url-shortener.me/GKC3",
    ms: "https://url-shortener.me/GKC8",
  },


// IGCSE Physics 2022 Jun Paper 2R
 "igcse/physics/2022-jun-r/paper2": {
    qp: "https://url-shortener.me/GKCC",
    ms: "https://url-shortener.me/GKCG",
  },


// IGCSE Physics 2022 Jan Paper 1
 "igcse/physics/2022-jan/paper1": {
    qp: "https://url-shortener.me/GKGK",
    ms: "https://url-shortener.me/GKH3",
  },

// IGCSE Physics 2022 Jan Paper 1R
 "igcse/physics/2022-jan-r/paper1": {
    qp: "https://shorturl.at/6BCR2",
    ms: "https://shorturl.at/KpXfY",
  },

// IGCSE Physics 2022 Jan Paper 2
 "igcse/physics/2022-jan/paper2": {
    qp: "https://url-shortener.me/GKHE",
    ms: "https://url-shortener.me/GKHG",
  },

// IGCSE Physics 2022 Jan Paper 2R
 "igcse/physics/2022-jan-r/paper2": {
    qp: "https://url-shortener.me/GKHI",
    ms: "https://url-shortener.me/GKHL",
  },


// IGCSE Physics 2021 Nov Paper 1
 "igcse/physics/2021-nov/paper1": {
    qp: "https://url-shortener.me/GKI1",
    ms: "https://url-shortener.me/GKI3",
  },

// IGCSE Physics 2021 Nov Paper 2
 "igcse/physics/2021-nov/paper2": {
    qp: "https://url-shortener.me/GKI6",
    ms: "https://url-shortener.me/GKI7",
  },

// IGCSE Physics 2021 Jun Paper 1
 "igcse/physics/2021-jun/paper1": {
    qp: "https://url-shortener.me/GKI8",
    ms: "https://url-shortener.me/GKIA",
  },

// IGCSE Physics 2021 Jun Paper 2
 "igcse/physics/2021-jun/paper2": {
    qp: "https://url-shortener.me/GKIC",
    ms: "https://url-shortener.me/GKIF",
  },

// IGCSE Physics 2021 Jan Paper 1
 "igcse/physics/2021-jan/paper1": {
    qp: "https://url-shortener.me/GKII",
    ms: "https://url-shortener.me/GKIJ",
  },

// IGCSE Physics 2021 Jan Paper 1R
 "igcse/physics/2021-jan-r/paper1": {
    qp: "https://url-shortener.me/GKIK",
    ms: "https://url-shortener.me/GKIL",
  },


// IGCSE Physics 2021 Jan Paper 2
 "igcse/physics/2021-jan/paper2": {
    qp: "https://url-shortener.me/GKIO",
    ms: "https://url-shortener.me/GKIQ",
  },


// IGCSE Physics 2021 Jan Paper 2R
"igcse/physics/2021-jan-r/paper2": {
    qp: "https://url-shortener.me/GKIS",
    ms: "https://url-shortener.me/GKIT",
  },

// IGCSE Physics 2020 Nov Paper 1
// IGCSE Physics 2020 Nov Paper 1R
// IGCSE Physics 2020 Nov Paper 2
// IGCSE Physics 2020 Nov Paper 2R


// IGCSE Physics 2020 Jan Paper 1
// IGCSE Physics 2020 Jan Paper 1R
// IGCSE Physics 2020 Jan Paper 2
// IGCSE Physics 2020 Jan Paper 2R


};

// Check if a paper has available PDFs
const getPaperPaths = (
  curriculum: string,
  subject: string,
  paper: string,
  year: string,
): { qp: string | null; ms: string | null } => {
  const yearFolder = getYearFolder(year);
  const paperPrefix = getPaperPrefix(paper);

  if (!yearFolder || !paperPrefix) {
    return { qp: null, ms: null };
  }

  const key = `${curriculum}/${subject}/${yearFolder}/${paperPrefix}`;

  // Check for external URLs first
  if (externalPaperUrls[key]) {
    return {
      qp: externalPaperUrls[key].qp || null,
      ms: externalPaperUrls[key].ms || null,
    };
  }

  // Currently available local papers
  const availablePapers: Record<string, boolean> = {
    "igcse/physics/2019-jun/paper1": true,
    "igcse/physics/2019-jun/paper2": true,
    "igcse/physics/2019-jun-r/paper1": true,
    "igcse/physics/2019-jun-r/paper2": true,
  };

  if (availablePapers[key]) {
    return {
      qp: `/papers/${curriculum}/${subject}/${yearFolder}/${paperPrefix}-qp.pdf`,
      ms: `/papers/${curriculum}/${subject}/${yearFolder}/${paperPrefix}-ms.pdf`,
    };
  }

  return { qp: null, ms: null };
};

const PaperOptions = () => {
  const { curriculum, subject, paper, year } = useParams<{
    curriculum: string;
    subject: string;
    paper: string;
    year: string;
  }>();

  const subjectNames = curriculum === "igcse" ? igcseSubjectNames : ialSubjectNames;
  const subjectName = subjectNames[subject || ""] || subject;
  const decodedYear = decodeURIComponent(year || "");
  const decodedPaper = decodeURIComponent(paper || "");
  const backPath = curriculum === "igcse" ? `/igcse-past-papers/${subject}` : `/ial-past-papers/${subject}`;
  const curriculumLabel = curriculum === "igcse" ? "IGCSE" : "IAL";

  const paths = getPaperPaths(curriculum || "", subject || "", decodedPaper, decodedYear);

  const options = [
    {
      title: "Question Paper",
      description: paths.qp ? "Click to open the examination question paper" : "Question paper not yet available",
      icon: FileText,
      type: "qp",
      href: paths.qp,
    },
    {
      title: "Mark Scheme",
      description: paths.ms ? "Click to open the official mark scheme" : "Mark scheme not yet available",
      icon: CheckSquare,
      type: "ms",
      href: paths.ms,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to={backPath}>
            <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {subjectName} Papers
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
              {curriculumLabel} {subjectName}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#1E3A8A] mb-4">
              {decodedPaper}{" "}
              <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">{decodedYear}</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Choose the document you want to download.</p>
          </motion.div>

          {/* Options Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {options.map((option, index) =>
              option.href ? (
                <motion.a
                  key={option.type}
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-xl border-2 border-[#1E3A8A] p-6 hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] hover:border-[#FACC15] transition-all cursor-pointer group"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-xl bg-[#1E3A8A]/10 flex items-center justify-center mb-4 group-hover:bg-[#FACC15]/20 transition-colors">
                      <option.icon className="w-8 h-8 text-[#1E3A8A]" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-[#1E3A8A] mb-2">{option.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{option.description}</p>
                    <div className="flex items-center gap-2 text-[#1E3A8A] text-sm font-medium">
                      <Download className="w-4 h-4" />
                      <span>Open PDF</span>
                    </div>
                  </div>
                </motion.a>
              ) : (
                <motion.div
                  key={option.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-xl border-2 border-border p-6 opacity-60"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mb-4">
                      <option.icon className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-muted-foreground mb-2">{option.title}</h3>
                    <p className="text-muted-foreground text-sm">{option.description}</p>
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaperOptions;
