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
    tone: "from-sky-100 to-blue-50",
    iconTone: "bg-sky-100 text-sky-700 border-sky-200",
  },
  {
    icon: Layers,
    title: "IGCSE Modular",
    description: "Past papers and mark schemes for IGCSE Modular examinations.",
    href: "/igcse-modular-past-papers",
    firstExam: "Jun 2025",
    latestExam: "Nov 2025",
    tone: "from-rose-100 to-pink-50",
    iconTone: "bg-rose-100 text-rose-700 border-rose-200",
  },
  {
    icon: BookOpen,
    title: "IAL",
    description: "Past papers and mark schemes for International Advanced Level examinations.",
    href: "/ial-past-papers",
    firstExam: "Jan 2019",
    latestExam: "Jan 2026",
    tone: "from-emerald-100 to-teal-50",
    iconTone: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
];

const PastPapers = () => {
  return (
    <section id="past-papers" className="min-h-screen py-24 bg-gradient-to-br from-sky-50 via-white to-amber-50 relative overflow-hidden flex items-center scroll-mt-16">
      <div className="absolute inset-0 bg-pattern-diagonal pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="section-kicker mb-4">
            Practice Materials
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
            Past{" "}
            <span className="inline-block px-4 py-2 rounded-xl bg-sky-200/70 text-primary shadow-sm">
              Papers
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Access a comprehensive collection of past examination papers to help you prepare effectively.
          </p>
        </motion.div>

        {/* Level Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {levels.map((level, index) => (
            <Link key={level.title} to={level.href} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className={`relative bg-gradient-to-br ${level.tone} rounded-2xl p-7 md:p-8 border border-white/70 overflow-hidden group hover:border-primary/40 hover:shadow-[0_18px_44px_rgba(250,204,21,0.24)] transition-all cursor-pointer h-full colorful-card`}
              >
                {/* Background Shape */}
                <div className="absolute top-0 right-0 w-24 h-24 md:w-28 md:h-28 bg-white/55 rounded-bl-[110px] -z-0 group-hover:bg-white/75 transition-colors" />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: -8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-xl border-2 flex items-center justify-center mb-5 shadow-sm ${level.iconTone}`}
                >
                  <level.icon className="w-7 h-7 md:w-8 md:h-8" />
                </motion.div>
                
                {/* Content */}
                <h3 className="relative z-10 font-heading font-bold text-2xl md:text-3xl text-[#1E3A8A] mb-4">
                  {level.title}
                </h3>
                <p className="relative z-10 text-muted-foreground text-base md:text-lg leading-relaxed">
                  {level.description}
                </p>
                {level.firstExam && level.latestExam && (
                  <div className="relative z-10 mt-5 pt-5 border-t border-border space-y-2">
                    <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">First Exam:</span> {level.firstExam}</p>
                    <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Latest Exam:</span> {level.latestExam}</p>
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
