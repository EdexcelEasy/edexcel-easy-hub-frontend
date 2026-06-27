import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { ADMIN_API_URL } from "@/lib/admin-api";

type SubjectCategory = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
};

const fallbackLevels = [
  {
    icon: GraduationCap,
    title: "IGCSE",
    description: "International General Certificate of Secondary Education for students aged 14-16.",
    link: "/igcse-subjects",
    tone: "from-sky-100 to-cyan-50",
    iconTone: "bg-sky-100 text-sky-700 border-sky-200",
  },
  {
    icon: BookOpen,
    title: "IAL",
    description: "International Advanced Levels for students preparing for university entrance.",
    link: "/ial-subjects",
    tone: "from-amber-100 to-orange-50",
    iconTone: "bg-amber-100 text-amber-700 border-amber-200",
  },
];

const Subjects = () => {
  const [categories, setCategories] = useState<SubjectCategory[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch(`${ADMIN_API_URL}/api/subjects/categories`);
        const payload = await response.json().catch(() => ({}));
        if (response.ok) setCategories(payload.data || []);
      } catch {
        setCategories([]);
      }
    };

    void loadCategories();
  }, []);

  const levels =
    categories.length > 0
      ? categories.map((category, index) => ({
          icon: index % 2 === 0 ? GraduationCap : BookOpen,
          title: category.title,
          description: category.description || "Explore subjects, units, and syllabus topics.",
          link: `/${category.slug}-subjects`,
          tone: index % 2 === 0 ? "from-sky-100 to-cyan-50" : "from-amber-100 to-orange-50",
          iconTone:
            index % 2 === 0
              ? "bg-sky-100 text-sky-700 border-sky-200"
              : "bg-amber-100 text-amber-700 border-amber-200",
        }))
      : fallbackLevels;

  return (
    <section id="subjects" className="min-h-screen py-24 relative overflow-hidden flex items-center scroll-mt-16">
      <div className="absolute inset-0 bg-pattern-dots bg-pattern-fade pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="section-kicker mb-4">
            Our Subjects
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
            Explore Our{" "}
            <span className="inline-block px-4 py-2 rounded-xl bg-amber-200/70 text-primary shadow-sm">
              Subjects
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive courses covering all major Edexcel IGCSE and A-Level subjects.
          </p>
        </motion.div>

        {/* Level Cards */}
        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {levels.map((level, index) => (
            <Link key={level.title} to={level.link}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className={`relative bg-gradient-to-br ${level.tone} rounded-2xl p-8 md:p-10 border border-white/70 overflow-hidden group hover:border-primary/40 hover:shadow-[0_18px_44px_rgba(14,165,233,0.22)] transition-all cursor-pointer h-full colorful-card`}
              >
                {/* Background Shape */}
                <div className="absolute top-0 right-0 w-28 h-28 md:w-32 md:h-32 bg-white/55 rounded-bl-[120px] -z-0 group-hover:bg-white/75 transition-colors" />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: -8, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-xl border-2 flex items-center justify-center mb-5 shadow-sm ${level.iconTone}`}
                >
                  <level.icon className="w-7 h-7 md:w-8 md:h-8" />
                </motion.div>
                
                {/* Content */}
                <h3 className="relative z-10 font-heading font-bold text-3xl md:text-4xl text-[#1E3A8A] mb-4">
                  {level.title}
                </h3>
                <p className="relative z-10 text-muted-foreground text-base md:text-lg leading-relaxed">
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
