import { motion } from "framer-motion";
import { BookOpen, FileText, Zap, Mail, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: BookOpen,
    title: "Subjects",
    description: "Get simplified specification, worksheets, notes and more.",
    link: "#subjects",
  },
  {
    icon: FileText,
    title: "Past Papers",
    description: "Get all the Past Papers & Mark Schemes all in one place.",
    link: "#past-papers",
  },
  {
    icon: Zap,
    title: "Cheatsheets & Important Questions",
    description: "Get formulas, definitions, diagrams and important questions all in one place.",
    link: "/cheatsheets",
  },
  {
    icon: Mail,
    title: "Inbox for Pricing",
    description: "Get the price and fees for our classes and paid work.",
    link: "/pricing",
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
        <div className="grid grid-cols-4 gap-3">
          {features.map((feature, index) => {
            const isExternal = feature.link.startsWith("#");
            const Wrapper = isExternal ? "a" : Link;
            const wrapperProps = isExternal ? { href: feature.link } : { to: feature.link };
            return (
              <Wrapper key={feature.title} {...(wrapperProps as any)}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative bg-card rounded-xl p-3 md:p-4 border border-border overflow-hidden group hover:border-[#1E3A8A] hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] transition-all cursor-pointer h-full"
                >
                  <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-muted/50 rounded-bl-[60px] -z-0" />
                  <div className="relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-lg border-2 border-[#1E3A8A]/20 flex items-center justify-center mb-2 md:mb-3 bg-background">
                    <feature.icon className="w-4 h-4 md:w-5 md:h-5 text-[#1E3A8A]" />
                  </div>
                  <h3 className="relative z-10 font-heading font-bold text-xs md:text-sm lg:text-base text-[#1E3A8A] mb-1">
                    {feature.title}
                  </h3>
                  <p className="relative z-10 text-muted-foreground text-[10px] md:text-xs lg:text-sm leading-tight">
                    {feature.description}
                  </p>
                </motion.div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;