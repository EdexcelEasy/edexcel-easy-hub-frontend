import { motion } from "framer-motion";
import { ArrowRight, Star, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroActions = [
  {
    label: "Subjects available",
    href: "#subjects",
    className: "bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 border-0 shadow-[0_12px_28px_rgba(249,115,22,0.24)] hover:from-amber-300 hover:to-orange-400",
  },
  {
    label: "Past Papers",
    href: "#past-papers",
    className: "bg-gradient-to-r from-blue-600 to-sky-500 text-white border-0 shadow-[0_12px_28px_rgba(37,99,235,0.22)] hover:from-blue-500 hover:to-sky-400",
  },
  {
    label: "Recorded Courses",
    href: "/buy-courses",
    className: "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white border-0 shadow-[0_12px_28px_rgba(147,51,234,0.2)] hover:from-violet-500 hover:to-fuchsia-400",
  },
  {
    label: "Resources",
    href: "#resources",
    className: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-[0_12px_28px_rgba(16,185,129,0.2)] hover:from-emerald-400 hover:to-teal-400",
  },
  {
    label: "Booklets",
    href: "#worksheets",
    className: "bg-gradient-to-r from-rose-500 to-pink-500 text-white border-0 shadow-[0_12px_28px_rgba(244,63,94,0.18)] hover:from-rose-400 hover:to-pink-400",
  },
  {
    label: "Blog",
    href: "#blog",
    className: "bg-white text-primary border-2 border-primary/25 shadow-sm hover:bg-primary hover:text-white hover:border-primary",
  },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-[var(--gradient-hero)]">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-pattern-grid bg-pattern-fade pointer-events-none" />
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(199_89%_48%_/_0.18)_0%,_transparent_48%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(329_86%_62%_/_0.13)_0%,_transparent_48%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="section-kicker mb-6 shadow-sm"
            >
              <motion.span
                animate={{ rotate: [0, 15, -10, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Star className="w-4 h-4 text-accent fill-accent" />
              </motion.span>
              <span className="text-sm font-medium text-foreground">
                Trusted by 10,000+ Students
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6 text-primary">
              Education is no longer{" "}
              <span className="text-gradient-primary">restricted</span>{" "}
              to a classroom
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Comprehensive study materials, past papers, and expert guidance to help you 
              achieve top grades in your IGCSE and A-Level examinations.
            </p>

            {/* CTA Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 justify-center mb-12 max-w-3xl mx-auto">
              {heroActions.map((action) => (
                <a key={action.label} href={action.href} className="inline-block">
                  <Button
                    type="button"
                    size="lg"
                    className={`group w-full transition-all cursor-pointer hover:scale-[1.02] ${action.className}`}
                  >
                    {action.label}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center">
              {[
                { Icon: Users, value: "10K+", label: "Students", tone: "bg-sky-100 text-sky-700" },
                { Icon: Award, value: "95%", label: "Pass Rate", tone: "bg-emerald-100 text-emerald-700" },
                { Icon: Star, value: "4.9/5", label: "Rating", tone: "bg-amber-100 text-amber-700" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 6 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${stat.tone}`}
                  >
                    <stat.Icon className="w-6 h-6" />
                  </motion.div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
