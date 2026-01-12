import { motion } from "framer-motion";
import { ArrowLeft, FlaskConical, Atom, Monitor, Code, Calculator, Pi, Dna, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const subjects = [
  {
    name: "Physics",
    slug: "physics",
    icon: Atom,
  },
  {
    name: "Chemistry",
    slug: "chemistry",
    icon: FlaskConical,
  },
  {
    name: "Mathematics B",
    slug: "mathematics-b",
    icon: Calculator,
  },
  {
    name: "Mathematics A",
    slug: "mathematics-a",
    icon: Calculator,
  },
  {
    name: "Further Pure Mathematics",
    slug: "further-pure-mathematics",
    icon: Pi,
  },
  {
    name: "Biology",
    slug: "biology",
    icon: Dna,
  },
  {
    name: "Human Biology",
    slug: "human-biology",
    icon: Heart,
  },
  {
    name: "ICT",
    slug: "ict",
    icon: Monitor,
  },
  {
    name: "Computer Science",
    slug: "computer-science",
    icon: Code,
  },
];

const IGCSEPastPapers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/">
            <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
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
              IGCSE Past Papers
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#1E3A8A] mb-4">
              IGCSE Past{" "}
              <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">
                Papers
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Access past examination papers and mark schemes for all IGCSE subjects.
            </p>
          </motion.div>

          {/* Subjects List */}
          <div className="max-w-2xl mx-auto space-y-3">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div
                  className="flex items-center gap-4 bg-card rounded-xl p-4 border border-border hover:border-[#1E3A8A] hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] transition-all cursor-pointer group"
                >
                  {/* Number */}
                  <span className="text-muted-foreground font-medium text-sm w-6">
                    {index + 1})
                  </span>
                  
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg border-2 border-[#1E3A8A]/20 flex items-center justify-center bg-background group-hover:border-[#1E3A8A]/40 transition-colors">
                    <subject.icon className="w-5 h-5 text-[#1E3A8A]" />
                  </div>
                  
                  {/* Subject Name */}
                  <h3 className="font-heading font-semibold text-[#1E3A8A] text-lg flex-1">
                    {subject.name}
                  </h3>
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

export default IGCSEPastPapers;
