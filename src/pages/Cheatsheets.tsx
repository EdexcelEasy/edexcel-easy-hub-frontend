import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText } from "lucide-react";

const cheatsheetCategories = [
  { title: "IGCSE - Edexcel (International)", slug: "igcse-edexcel" },
  { title: "IAL - Edexcel (International)", slug: "ial-edexcel" },
  { title: "IGCSE - AQA", slug: "igcse-aqa" },
  { title: "IAL - AQA", slug: "ial-aqa" },
];

const Cheatsheets = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Cheatsheets
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Quick-reference cheatsheets to help you revise key concepts efficiently.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {cheatsheetCategories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="group relative rounded-2xl border border-border bg-card p-6 text-center hover:shadow-lg hover:border-primary/40 transition-all duration-300 cursor-pointer">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <FileText className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="font-heading text-lg font-bold text-foreground mb-2">
                    {category.title}
                  </h2>
                  <span className="inline-block text-xs font-medium bg-muted text-muted-foreground px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cheatsheets;
