import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import Subjects from "@/components/Subjects";
import PastPapers from "@/components/PastPapers";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <Subjects />
      <PastPapers />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;