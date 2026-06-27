import { motion } from "framer-motion";
import { BookOpen, FileText, Video, Users, Clock, Trophy } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Comprehensive Notes",
    description: "Detailed study notes covering every topic in the syllabus, written by expert educators.",
    color: "sky",
  },
  {
    icon: FileText,
    title: "Past Papers",
    description: "Access to years of past exam papers with model answers and marking schemes.",
    color: "amber",
  },
  {
    icon: Video,
    title: "Video Lessons",
    description: "Engaging video explanations that make complex concepts easy to understand.",
    color: "rose",
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Get help from qualified teachers who understand the Edexcel curriculum.",
    color: "emerald",
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    description: "Study at your own pace, anytime, anywhere with our mobile-friendly platform.",
    color: "violet",
  },
  {
    icon: Trophy,
    title: "Track Progress",
    description: "Monitor your improvement with detailed analytics and performance insights.",
    color: "orange",
  },
];

const Features = () => {
  return (
    <section id="resources" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-kicker mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-gradient-primary">Succeed</span>
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
              className="group bg-card/90 rounded-2xl p-6 border border-border card-hover colorful-card overflow-hidden"
            >
              <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-[80px] bg-gradient-to-br from-amber-200/50 via-sky-200/40 to-rose-200/40 transition-transform duration-300 group-hover:scale-125" />
              <div
                className={`relative z-10 w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 ${
                  feature.color === "sky"
                    ? "bg-sky-100 text-sky-700"
                    : feature.color === "amber"
                      ? "bg-amber-100 text-amber-700"
                      : feature.color === "rose"
                        ? "bg-rose-100 text-rose-700"
                        : feature.color === "emerald"
                          ? "bg-emerald-100 text-emerald-700"
                          : feature.color === "violet"
                            ? "bg-violet-100 text-violet-700"
                            : "bg-orange-100 text-orange-700"
                }`}
              >
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="relative z-10 font-heading font-bold text-xl mb-3">{feature.title}</h3>
              <p className="relative z-10 text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
