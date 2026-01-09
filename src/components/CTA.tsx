import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-primary via-primary to-primary/90 rounded-3xl p-8 md:p-16 overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-2xl" />
          
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground font-medium text-sm mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Limited Time Offer
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-6 max-w-3xl mx-auto">
              Start Your Journey to{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Academic Excellence</span>
                <span className="absolute bottom-2 left-0 w-full h-4 bg-accent/40 -z-0 rounded" />
              </span>
            </h2>

            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of successful students. Get access to all subjects, 
              study materials, and expert support. Start free today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="group bg-transparent border-2 border-[#FACC15] text-[#FACC15] hover:bg-[#FACC15] hover:text-[#1E3A8A] transition-all"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                className="group bg-transparent border-2 border-[#FACC15] text-[#FACC15] hover:bg-[#FACC15] hover:text-[#1E3A8A] transition-all"
              >
                View Pricing
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
