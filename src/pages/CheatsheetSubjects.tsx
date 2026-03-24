import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, FlaskConical, Atom, HeartPulse, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const categoryData: Record<string, { title: string; subjects: { name: string; slug: string; icon: React.ReactNode }[] }> = {
  "igcse-edexcel": {
    title: "IGCSE - Edexcel (International)",
    subjects: [
      { name: "Physics", slug: "physics", icon: <Atom className="w-7 h-7 text-primary" /> },
      { name: "Chemistry", slug: "chemistry", icon: <FlaskConical className="w-7 h-7 text-primary" /> },
      { name: "Biology", slug: "biology", icon: <Leaf className="w-7 h-7 text-primary" /> },
      { name: "Human Biology", slug: "human-biology", icon: <HeartPulse className="w-7 h-7 text-primary" /> },
    ],
  },
};

const CheatsheetSubjects = () => {
  const { category } = useParams<{ category: string }>();
  const data = category ? categoryData[category] : null;

  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16 container mx-auto px-4 text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground">Category not found</h1>
          <Link to="/cheatsheets">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cheatsheets
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/cheatsheets">
            <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cheatsheets
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              {data.title}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select a subject to view cheatsheets.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {data.subjects.map((subject, index) => (
              <motion.div
                key={subject.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group rounded-2xl border border-border bg-card p-6 text-center hover:shadow-lg hover:border-primary/40 transition-all duration-300 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  {subject.icon}
                </div>
                <h2 className="font-heading text-lg font-bold text-foreground">
                  {subject.name}
                </h2>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheatsheetSubjects;
