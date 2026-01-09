import { motion } from "framer-motion";
import { BookOpen, FileText, Video, Users, Clock, Trophy } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Comprehensive Notes",
    description: "Detailed study notes covering every topic in the syllabus, written by expert educators.",
    color: "primary",
  },
  {
    icon: FileText,
    title: "Past Papers",
    description: "Access to years of past exam papers with model answers and marking schemes.",
    color: "accent",
  },
  {
    icon: Video,
    title: "Video Lessons",
    description: "Engaging video explanations that make complex concepts easy to understand.",
    color: "primary",
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Get help from qualified teachers who understand the Edexcel curriculum.",
    color: "accent",
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    description: "Study at your own pace, anytime, anywhere with our mobile-friendly platform.",
    color: "primary",
  },
  {
    icon: Trophy,
    title: "Track Progress",
    description: "Monitor your improvement with detailed analytics and performance insights.",
    color: "accent",
  },
];

const Features = () => {
  return (
    <section id="resources" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-primary">Succeed</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide all the tools and resources you need to excel in your Edexcel examinations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-6 border border-border card-hover"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 ${
                  feature.color === "primary"
                    ? "bg-primary/10 text-primary"
                    : "bg-accent/10 text-accent"
                }`}
              >
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
