import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Subjects from "@/components/Subjects";
import PastPapers from "@/components/PastPapers";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <Subjects />
      <PastPapers />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;