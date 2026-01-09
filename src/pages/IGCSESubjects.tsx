import { motion } from "framer-motion";
import { ArrowLeft, FlaskConical, Atom, Monitor, Code, Calculator, Pi, Dna, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const subjects = [
  {
    name: "Chemistry",
    slug: "chemistry",
    icon: FlaskConical,
    description: "Study of matter, its properties, and chemical reactions.",
  },
  {
    name: "Physics",
    slug: "physics",
    icon: Atom,
    description: "Understanding the fundamental laws of nature and energy.",
  },
  {
    name: "ICT",
    slug: "ict",
    icon: Monitor,
    description: "Information and Communication Technology essentials.",
  },
  {
    name: "Computer Science",
    slug: "computer-science",
    icon: Code,
    description: "Programming, algorithms, and computational thinking.",
  },
  {
    name: "Mathematics A",
    slug: "mathematics-a",
    icon: Calculator,
    description: "Core mathematical concepts and problem-solving skills.",
  },
  {
    name: "Mathematics B",
    slug: "mathematics-b",
    icon: Calculator,
    description: "Advanced mathematical applications and techniques.",
  },
  {
    name: "Further Pure Mathematics",
    slug: "further-pure-mathematics",
    icon: Pi,
    description: "Advanced pure mathematics for ambitious learners.",
  },
  {
    name: "Biology",
    slug: "biology",
    icon: Dna,
    description: "Study of living organisms and life processes.",
  },
  {
    name: "Human Biology",
    slug: "human-biology",
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
          <div className="grid grid-cols-3 gap-3">
            {subjects.map((subject, index) => (
              <Link key={subject.name} to={`/igcse/${subject.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative bg-card rounded-xl p-3 md:p-4 border border-border overflow-hidden group hover:border-[#1E3A8A] hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] transition-all cursor-pointer h-full"
                >
                  {/* Background Shape */}
                  <div className="absolute top-0 right-0 w-12 h-12 md:w-14 md:h-14 bg-muted/50 rounded-bl-[60px] -z-0" />
                  
                  {/* Icon */}
                  <div className="relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-lg border-2 border-[#1E3A8A]/20 flex items-center justify-center mb-2 md:mb-3 bg-background">
                    <subject.icon className="w-4 h-4 md:w-5 md:h-5 text-[#1E3A8A]" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="relative z-10 font-heading font-bold text-xs md:text-sm lg:text-base text-[#1E3A8A] mb-1">
                    {subject.name}
                  </h3>
                  <p className="relative z-10 text-muted-foreground text-[10px] md:text-xs leading-tight hidden sm:block">
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

export default IGCSESubjects;