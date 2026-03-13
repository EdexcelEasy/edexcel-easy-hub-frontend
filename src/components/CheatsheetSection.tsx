import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const CheatsheetSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#1E3A8A]/30"
          >
            <Zap className="w-10 h-10 text-[#FACC15]" fill="#FACC15" strokeWidth={1.5} />
          </motion.div>

          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Exam{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Cheatsheets</span>
              <span className="absolute -bottom-1 left-0 right-0 h-3 bg-[#FACC15]/30 rounded-full" />
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Quick-reference revision sheets packed with key formulas, definitions, and diagrams — all in one page.
          </p>

          <Link to="/cheatsheets">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-card border-2 border-[#1E3A8A] text-foreground font-heading font-bold text-lg shadow-md hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] transition-all duration-300 cursor-pointer"
            >
              <Zap className="w-5 h-5 text-[#FACC15]" fill="#FACC15" />
              Browse Cheatsheets
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CheatsheetSection;
