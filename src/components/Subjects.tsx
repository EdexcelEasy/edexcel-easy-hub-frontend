import { motion } from "framer-motion";
import { GraduationCap, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const levels = [
  {
    icon: GraduationCap,
    title: "IGCSE",
    description: "International General Certificate of Secondary Education for students aged 14-16.",
    link: "/igcse-subjects",
  },
  {
    icon: BookOpen,
    title: "IAL",
    description: "International Advanced Levels for students preparing for university entrance.",
    link: "/ial-subjects",
  },
];

const Subjects = () => {
  return (
    <section id="subjects" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern-dots bg-pattern-fade pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Our Subjects
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Explore Our{" "}
            <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">
              Subjects
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive courses covering all major Edexcel IGCSE and A-Level subjects.
          </p>
        </motion.div>

        {/* Level Cards */}
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {levels.map((level, index) => (
            <Link key={level.title} to={level.link}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="relative bg-card rounded-xl p-4 md:p-6 border border-border overflow-hidden group hover:border-[#1E3A8A] hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] transition-colors cursor-pointer h-full"
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
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Subjects;