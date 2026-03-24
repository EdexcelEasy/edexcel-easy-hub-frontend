import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Lock, Crown, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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
          <Link to="/">
            <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Cheatsheets
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Quick-reference cheatsheets to help you revise key concepts efficiently.
            </p>
          </motion.div>

          {/* Premium Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative overflow-hidden rounded-2xl border-2 border-[#FACC15] bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] p-5 text-center shadow-[0_0_40px_rgba(250,204,21,0.25)]">
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
              
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2">
                  <Crown className="w-6 h-6 text-[#FACC15]" fill="#FACC15" />
                  <span className="font-heading font-bold text-lg text-white">
                    Premium Content
                  </span>
                  <Crown className="w-6 h-6 text-[#FACC15]" fill="#FACC15" />
                </div>
                <p className="text-white/90 text-sm max-w-md">
                  Cheatsheets are exclusive to paid subscribers. Unlock all revision sheets with a plan.
                </p>
                <Link
                  to="/pricing"
                  className="mt-1 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#FACC15] text-[#1E3A8A] font-bold text-sm hover:bg-[#FDE047] transition-colors shadow-lg"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {cheatsheetCategories.map((category, index) => {
              const card = (
                <div className="group relative rounded-2xl border border-border bg-card p-6 text-center hover:shadow-lg hover:border-[#1E3A8A]/40 transition-all duration-300 cursor-pointer">
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#FACC15]/20 flex items-center justify-center">
                    <Lock className="w-3.5 h-3.5 text-[#FACC15]" />
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <FileText className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="font-heading text-lg font-bold text-foreground mb-2">
                    {category.title}
                  </h2>
                  <span className="inline-block text-xs font-bold bg-[#FACC15]/20 text-[#1E3A8A] px-3 py-1 rounded-full border border-[#FACC15]/40">
                    Paid Only
                  </span>
                </div>
              );

              return (
                <motion.div
                  key={category.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  {category.slug === "igcse-edexcel" ? (
                    <Link to={`/cheatsheets/${category.slug}`} className="block">{card}</Link>
                  ) : card}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cheatsheets;
