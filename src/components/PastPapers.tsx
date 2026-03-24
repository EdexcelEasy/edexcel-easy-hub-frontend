import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Layers } from "lucide-react";
import { Link } from "react-router-dom";

const levels = [
  {
    icon: GraduationCap,
    title: "IGCSE",
    description: "Past papers and mark schemes for International GCSE examinations.",
    href: "/igcse-past-papers",
    firstExam: "Jan 2019",
    latestExam: "Jan 2026",
  },
  {
    icon: Layers,
    title: "IGCSE Modular",
    description: "Past papers and mark schemes for IGCSE Modular examinations.",
    href: "/igcse-modular-past-papers",
    firstExam: "Jun 2025",
    latestExam: "Nov 2025",
  },
  {
    icon: BookOpen,
    title: "IAL",
    description: "Past papers and mark schemes for International Advanced Level examinations.",
    href: "/ial-past-papers",
    firstExam: "Jan 2019",
    latestExam: "Jan 2026",
  },
];

const PastPapers = () => {
  return (
    <section id="past-papers" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Practice Materials
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Past{" "}
            <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">
              Papers
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access a comprehensive collection of past examination papers to help you prepare effectively.
          </p>
        </motion.div>

        {/* Level Cards */}
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {levels.map((level, index) => (
            <Link key={level.title} to={level.href} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-card rounded-xl p-4 md:p-6 border border-border overflow-hidden group hover:border-[#1E3A8A] hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] transition-all cursor-pointer h-full"
              >
                {/* Background Shape */}
                <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-muted/50 rounded-bl-[80px] -z-0" />
                
                {/* Icon */}
                <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 border-[#1E3A8A]/20 flex items-center justify-center mb-3 md:mb-4 bg-background">
                  <level.icon className="w-5 h-5 md:w-6 md:h-6 text-[#1E3A8A]" />
                </div>
                
                {/* Content */}
                <h3 className="relative z-10 font-heading font-bold text-xl md:text-2xl text-[#1E3A8A] mb-2">
                  {level.title}
                </h3>
                <p className="relative z-10 text-muted-foreground text-sm md:text-base">
                  {level.description}
                </p>
                {level.firstExam && level.latestExam && (
                  <div className="relative z-10 mt-3 pt-3 border-t border-border space-y-1">
                    <p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">First Exam:</span> {level.firstExam}</p>
                    <p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">Latest Exam:</span> {level.latestExam}</p>
                  </div>
                )}
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastPapers;