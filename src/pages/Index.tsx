import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import Subjects from "@/components/Subjects";
import PastPapers from "@/components/PastPapers";
import Booklets from "@/components/Booklets";
import CheatsheetSection from "@/components/CheatsheetSection";
import Testimonials from "@/components/Testimonials";
import Instructors from "@/components/Instructors";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <Subjects />
      <PastPapers />
      <Booklets />
      <CheatsheetSection />
      <Testimonials />
      <Instructors />
      <Footer />
    </div>
  );
};

export default Index;