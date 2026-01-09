import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const subjects = [
  {
    name: "Mathematics",
    level: "IGCSE & A-Level",
    topics: 45,
    image: "📐",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    name: "Physics",
    level: "IGCSE & A-Level",
    topics: 38,
    image: "⚛️",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    name: "Chemistry",
    level: "IGCSE & A-Level",
    topics: 42,
    image: "🧪",
    gradient: "from-green-500 to-teal-600",
  },
  {
    name: "Biology",
    level: "IGCSE & A-Level",
    topics: 40,
    image: "🧬",
    gradient: "from-red-500 to-orange-600",
  },
  {
    name: "English",
    level: "IGCSE",
    topics: 28,
    image: "📚",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    name: "Economics",
    level: "IGCSE & A-Level",
    topics: 32,
    image: "📊",
    gradient: "from-amber-500 to-yellow-600",
  },
];

const Subjects = () => {
  return (
    <section id="subjects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Our Subjects
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Explore Our{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Subjects</span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-accent/40 -z-0 rounded" />
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive courses covering all major Edexcel IGCSE and A-Level subjects.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl border border-border overflow-hidden card-hover cursor-pointer"
            >
              {/* Gradient Header */}
              <div className={`h-24 bg-gradient-to-r ${subject.gradient} flex items-center justify-center`}>
                <span className="text-5xl">{subject.image}</span>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl mb-1">{subject.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{subject.level}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">
                    {subject.topics} Topics
                  </span>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
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
            View All Subjects
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Subjects;
