import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plans = [
  {
    name: "Basic",
    price: "Free",
    period: "",
    description: "Perfect for getting started",
    features: [
      "Access to free resources",
      "Limited past papers",
      "Basic study notes",
      "Community support",
    ],
    highlighted: false,
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "/month",
    description: "Most popular for serious students",
    features: [
      "All IGCSE subjects",
      "Unlimited past papers",
      "Video lessons",
      "Detailed mark schemes",
      "Priority support",
      "Progress tracking",
    ],
    highlighted: true,
  },
  {
    name: "Ultimate",
    price: "$19.99",
    period: "/month",
    description: "Complete access to everything",
    features: [
      "All IGCSE & IAL subjects",
      "Unlimited past papers",
      "All video lessons",
      "1-on-1 tutoring sessions",
      "Personalized study plan",
      "24/7 priority support",
      "Certificate of completion",
    ],
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/">
            <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              Pricing Plans
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#1E3A8A] mb-4">
              Choose Your{" "}
              <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">
                Plan
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Select the perfect plan that fits your learning needs and budget.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-card rounded-xl p-6 border-2 ${
                  plan.highlighted 
                    ? "border-[#1E3A8A] shadow-[0_8px_30px_rgba(250,204,21,0.3)]" 
                    : "border-border"
                } overflow-hidden`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 right-0 bg-[#FACC15] text-[#1E3A8A] text-xs font-bold px-3 py-1 rounded-bl-lg">
                    POPULAR
                  </div>
                )}
                
                <h3 className="font-heading font-bold text-xl text-[#1E3A8A] mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {plan.description}
                </p>
                
                <div className="mb-6">
                  <span className="text-4xl font-heading font-bold text-[#1E3A8A]">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-[#FACC15]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.highlighted 
                      ? "bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90" 
                      : "bg-transparent border-2 border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white"
                  } transition-all`}
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;