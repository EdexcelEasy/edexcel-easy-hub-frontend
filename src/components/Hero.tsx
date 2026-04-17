import { motion } from "framer-motion";
import { ArrowRight, Star, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-pattern-grid bg-pattern-fade pointer-events-none" />
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(222_72%_33%_/_0.08)_0%,_transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(48_96%_53%_/_0.08)_0%,_transparent_50%)] pointer-events-none" />
      
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
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
              Education is no longer restricted to a classroom
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Comprehensive study materials, past papers, and expert guidance to help you 
              achieve top grades in your IGCSE and A-Level examinations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="#subjects" className="inline-block">
                <Button 
                  type="button"
                  size="lg" 
                  className="group w-full bg-background border-2 border-primary text-primary hover:bg-[#FACC15] hover:text-primary transition-all cursor-pointer"
                >
                  Subjects available
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="#past-papers" className="inline-block">
                <Button 
                  type="button"
                  size="lg" 
                  className="group w-full bg-background border-2 border-primary text-primary hover:bg-[#FACC15] hover:text-primary transition-all cursor-pointer"
                >
                  Past Papers
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center">
              {[
                { Icon: Users, value: "10K+", label: "Students" },
                { Icon: Award, value: "95%", label: "Pass Rate" },
                { Icon: Star, value: "4.9/5", label: "Rating" },
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
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"
                  >
                    <stat.Icon className="w-6 h-6 text-primary" />
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
