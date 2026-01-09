import { motion } from "framer-motion";
import { ArrowLeft, FlaskConical, Atom, Monitor, Code, Calculator, Pi, Dna, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const subjects = [
  {
    name: "Chemistry",
    icon: FlaskConical,
    description: "Study of matter, its properties, and chemical reactions.",
  },
  {
    name: "Physics",
    icon: Atom,
    description: "Understanding the fundamental laws of nature and energy.",
  },
  {
    name: "ICT",
    icon: Monitor,
    description: "Information and Communication Technology essentials.",
  },
  {
    name: "Computer Science",
    icon: Code,
    description: "Programming, algorithms, and computational thinking.",
  },
  {
    name: "Mathematics A",
    icon: Calculator,
    description: "Core mathematical concepts and problem-solving skills.",
  },
  {
    name: "Mathematics B",
    icon: Calculator,
    description: "Advanced mathematical applications and techniques.",
  },
  {
    name: "Further Pure Mathematics",
    icon: Pi,
    description: "Advanced pure mathematics for ambitious learners.",
  },
  {
    name: "Biology",
    icon: Dna,
    description: "Study of living organisms and life processes.",
  },
  {
    name: "Human Biology",
    icon: Heart,
    description: "Focus on human body systems and health.",
  },
];

const IGCSESubjects = () => {
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
              IGCSE Programme
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#1E3A8A] mb-4">
              IGCSE{" "}
              <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">
                Subjects
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Explore our comprehensive range of IGCSE subjects with expert guidance and resources.
            </p>
          </motion.div>

          {/* Subjects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-card rounded-xl p-4 md:p-6 border border-border overflow-hidden group hover:border-[#1E3A8A] hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] transition-all cursor-pointer"
              >
                {/* Background Shape */}
                <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-muted/50 rounded-bl-[80px] -z-0" />
                
                {/* Icon */}
                <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 border-[#1E3A8A]/20 flex items-center justify-center mb-3 md:mb-4 bg-background">
                  <subject.icon className="w-5 h-5 md:w-6 md:h-6 text-[#1E3A8A]" />
                </div>
                
                {/* Content */}
                <h3 className="relative z-10 font-heading font-bold text-lg md:text-xl text-[#1E3A8A] mb-2">
                  {subject.name}
                </h3>
                <p className="relative z-10 text-muted-foreground text-sm md:text-base">
                  {subject.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IGCSESubjects;