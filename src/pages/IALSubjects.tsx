import { motion } from "framer-motion";
import { ArrowLeft, Atom, Calculator, Dna, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const subjects = [
  {
    name: "Physics",
    slug: "physics",
    icon: Atom,
    description: "Advanced study of forces, energy, waves, and particle physics.",
  },
  {
    name: "Mathematics",
    slug: "mathematics",
    icon: Calculator,
    description: "Pure and applied mathematics for university preparation.",
  },
  {
    name: "Biology",
    slug: "biology",
    icon: Dna,
    description: "In-depth study of biological systems and processes.",
  },
  {
    name: "Information Technology",
    slug: "information-technology",
    icon: Monitor,
    description: "Advanced IT concepts and practical applications.",
  },
];

const IALSubjects = () => {
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
              IAL Programme
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#1E3A8A] mb-4">
              IAL{" "}
              <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">
                Subjects
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Explore our comprehensive range of IAL subjects with expert guidance and resources.
            </p>
          </motion.div>

          {/* Subjects Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {subjects.map((subject, index) => (
              <Link key={subject.name} to={`/ial/${subject.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative bg-card rounded-xl p-4 md:p-6 border border-border overflow-hidden group hover:border-[#1E3A8A] hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] transition-all cursor-pointer h-full"
                >
                  {/* Background Shape */}
                  <div className="absolute top-0 right-0 w-12 h-12 md:w-14 md:h-14 bg-muted/50 rounded-bl-[60px] -z-0" />
                  
                  {/* Icon */}
                  <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 border-[#1E3A8A]/20 flex items-center justify-center mb-3 md:mb-4 bg-background">
                    <subject.icon className="w-5 h-5 md:w-6 md:h-6 text-[#1E3A8A]" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="relative z-10 font-heading font-bold text-sm md:text-lg text-[#1E3A8A] mb-1 md:mb-2">
                    {subject.name}
                  </h3>
                  <p className="relative z-10 text-muted-foreground text-xs md:text-sm leading-tight">
                    {subject.description}
                  </p>
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

export default IALSubjects;
