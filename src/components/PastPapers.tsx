import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchPastPaperCurricula, getPastPaperCurriculumPath, type PastPaperCurriculum } from "@/lib/past-papers";

const curriculumStyles = [
  { icon: GraduationCap, tone: "from-sky-100 to-blue-50", iconTone: "bg-sky-100 text-sky-700 border-sky-200" },
  { icon: Layers, tone: "from-rose-100 to-pink-50", iconTone: "bg-rose-100 text-rose-700 border-rose-200" },
  { icon: BookOpen, tone: "from-emerald-100 to-teal-50", iconTone: "bg-emerald-100 text-emerald-700 border-emerald-200" },
];

function getCurriculumDescription(curriculum: PastPaperCurriculum) {
  if (curriculum.slug === "igcse") return "Past papers and mark schemes for International GCSE examinations.";
  if (curriculum.slug === "igcse-modular") return "Past papers and mark schemes for IGCSE Modular examinations.";
  if (curriculum.slug === "ial") return "Past papers and mark schemes for International Advanced Level examinations.";
  return `Past papers and mark schemes for ${curriculum.title}.`;
}

const PastPapers = () => {
  const [curricula, setCurricula] = useState<PastPaperCurriculum[]>([]);

  useEffect(() => {
    const loadCurricula = async () => {
      try {
        setCurricula(await fetchPastPaperCurricula());
      } catch {
        setCurricula([]);
      }
    };

    void loadCurricula();
  }, []);

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
        {curricula.length === 0 ? (
          <p className="mx-auto max-w-2xl rounded-xl border bg-white/80 p-6 text-center text-muted-foreground">
            No past papers have been added yet.
          </p>
        ) : (
        <div className="grid justify-center gap-8 sm:grid-cols-[repeat(auto-fit,minmax(280px,360px))] max-w-6xl mx-auto">
          {curricula.map((curriculum, index) => {
            const style = curriculumStyles[index % curriculumStyles.length];
            const Icon = style.icon;
            return (
            <Link key={curriculum.slug} to={getPastPaperCurriculumPath(curriculum.slug)} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className={`relative bg-gradient-to-br ${style.tone} rounded-2xl p-7 md:p-8 border border-white/70 overflow-hidden group hover:border-primary/40 hover:shadow-[0_18px_44px_rgba(250,204,21,0.24)] transition-all cursor-pointer h-full colorful-card`}
              >
                {/* Background Shape */}
                <div className="absolute top-0 right-0 w-24 h-24 md:w-28 md:h-28 bg-white/55 rounded-bl-[110px] -z-0 group-hover:bg-white/75 transition-colors" />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: -8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-xl border-2 flex items-center justify-center mb-5 shadow-sm ${style.iconTone}`}
                >
                  <Icon className="w-7 h-7 md:w-8 md:h-8" />
                </motion.div>
                
                {/* Content */}
                <h3 className="relative z-10 font-heading font-bold text-2xl md:text-3xl text-[#1E3A8A] mb-4">
                  {curriculum.title}
                </h3>
                <p className="relative z-10 text-muted-foreground text-base md:text-lg leading-relaxed">
                  {getCurriculumDescription(curriculum)}
                </p>
              </motion.div>
            </Link>
          );
          })}
        </div>
        )}
      </div>
    </section>
  );
};

export default PastPapers;
