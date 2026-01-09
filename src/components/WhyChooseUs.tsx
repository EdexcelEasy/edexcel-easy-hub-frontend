import { motion } from "framer-motion";
import { Video, FileText, Brain, Clock, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Video Lessons",
    description: "Crystal-clear explanations of every concept with engaging video content.",
  },
  {
    icon: FileText,
    title: "Revision Notes",
    description: "Comprehensive, exam-focused notes covering the complete syllabus.",
  },
  {
    icon: Brain,
    title: "Practice Questions",
    description: "Thousands of past paper questions with detailed mark scheme answers.",
  },
  {
    icon: Clock,
    title: "Quick Revision",
    description: "Time-saving summaries perfect for last-minute exam preparation.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1E3A8A] text-white font-medium text-sm mb-6">
            <CheckCircle className="w-4 h-4" />
            Why Choose Us
          </div>
          
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold italic text-[#1E3A8A] mb-6">
            Everything You Need to Succeed
          </h2>
          
          {/* Subtitle */}
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our comprehensive learning platform provides all the tools and resources you need to excel in your Edexcel examinations.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-card rounded-2xl p-6 border border-border overflow-hidden group hover:shadow-lg transition-shadow"
            >
              {/* Background Shape */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-muted/50 rounded-bl-[100px] -z-0" />
              
              {/* Icon */}
              <div className="relative z-10 w-14 h-14 rounded-xl border-2 border-[#1E3A8A]/20 flex items-center justify-center mb-6 bg-background">
                <feature.icon className="w-6 h-6 text-[#1E3A8A]" />
              </div>
              
              {/* Content */}
              <h3 className="relative z-10 font-heading font-bold text-xl text-[#1E3A8A] mb-3">
                {feature.title}
              </h3>
              <p className="relative z-10 text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;