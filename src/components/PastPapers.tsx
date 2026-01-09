import { motion } from "framer-motion";
import { ArrowRight, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const papers = [
  {
    subject: "Mathematics",
    year: "2024",
    papers: 12,
    image: "📐",
  },
  {
    subject: "Physics",
    year: "2024",
    papers: 10,
    image: "⚛️",
  },
  {
    subject: "Chemistry",
    year: "2024",
    papers: 10,
    image: "🧪",
  },
  {
    subject: "Biology",
    year: "2024",
    papers: 8,
    image: "🧬",
  },
  {
    subject: "English",
    year: "2024",
    papers: 6,
    image: "📚",
  },
  {
    subject: "Economics",
    year: "2024",
    papers: 8,
    image: "📊",
  },
];

const PastPapers = () => {
  return (
    <section id="past-papers" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Practice Materials
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Past{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Papers</span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-accent/40 -z-0 rounded" />
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access a comprehensive collection of past examination papers to help you prepare effectively.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.map((paper, index) => (
            <motion.div
              key={paper.subject}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{paper.image}</span>
                  <div>
                    <h3 className="font-heading font-bold text-lg">{paper.subject}</h3>
                    <p className="text-sm text-muted-foreground">{paper.year} Papers</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-sm font-medium text-primary">
                  {paper.papers} Papers Available
                </span>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg">
            View All Past Papers
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PastPapers;