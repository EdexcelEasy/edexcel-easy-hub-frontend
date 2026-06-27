import { motion } from "framer-motion";
import { BookOpen, FileText, Zap, Mail, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: BookOpen,
    title: "Buy Courses",
    description: "Enroll in IGCSE & IAL exam preparation courses for expert guidance.",
    link: "/buy-courses",
    tone: "from-sky-100 to-cyan-50",
    iconTone: "bg-sky-100 text-sky-700 border-sky-200",
  },
  {
    icon: FileText,
    title: "Past Papers",
    description: "Get all the Past Papers & Mark Schemes all in one place.",
    link: "#past-papers",
    tone: "from-emerald-100 to-teal-50",
    iconTone: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  {
    icon: Zap,
    title: "Cheatsheets & Important Questions",
    description: "Get formulas, definitions, diagrams and important questions all in one place.",
    link: "/cheatsheets",
    tone: "from-amber-100 to-orange-50",
    iconTone: "bg-amber-100 text-amber-700 border-amber-200",
  },
  {
    icon: Mail,
    title: "Inbox for Pricing",
    description: "Get the price and fees for our classes and paid work.",
    link: "/pricing",
    tone: "from-rose-100 to-pink-50",
    iconTone: "bg-rose-100 text-rose-700 border-rose-200",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="resources" className="py-20 bg-gradient-to-br from-white via-amber-50 to-cyan-50 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-pattern-grid bg-pattern-fade pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <div className="section-kicker mb-6">
            <CheckCircle className="w-4 h-4" />
            Why Choose Us
          </div>
          
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold italic text-[#1E3A8A] mb-6">
            Everything You Need to{" "}
            <span className="text-gradient-primary">Succeed</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our comprehensive learning platform provides all the tools and resources you need to excel in your Edexcel examinations.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => {
            const isExternal = feature.link.startsWith("#");
            const Wrapper = isExternal ? "a" : Link;
            const wrapperProps = isExternal ? { href: feature.link } : { to: feature.link };
            return (
              <Wrapper key={feature.title} {...(wrapperProps as any)}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`relative bg-gradient-to-br ${feature.tone} rounded-xl p-4 border border-white/70 overflow-hidden group hover:border-primary/40 hover:shadow-[0_14px_36px_rgba(14,165,233,0.18)] transition-all cursor-pointer h-full colorful-card`}
                >
                  <div className="absolute top-0 right-0 w-14 h-14 md:w-16 md:h-16 bg-white/55 rounded-bl-[60px] -z-0 group-hover:bg-white/75 transition-colors" />
                  <motion.div
                    whileHover={{ rotate: -8, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`relative z-10 w-9 h-9 md:w-10 md:h-10 rounded-lg border-2 flex items-center justify-center mb-3 shadow-sm ${feature.iconTone}`}
                  >
                    <feature.icon className="w-4 h-4 md:w-5 md:h-5" />
                  </motion.div>
                  <h3 className="relative z-10 font-heading font-bold text-sm lg:text-base text-[#1E3A8A] mb-1">
                    {feature.title}
                  </h3>
                  <p className="relative z-10 text-muted-foreground text-xs lg:text-sm leading-snug">
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
