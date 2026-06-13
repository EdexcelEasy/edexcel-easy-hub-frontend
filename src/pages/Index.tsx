import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import Subjects from "@/components/Subjects";
import PastPapers from "@/components/PastPapers";
import Booklets from "@/components/Booklets";
import CheatsheetSection from "@/components/CheatsheetSection";
import RecordedCoursesSection from "@/components/RecordedCoursesSection";
import Testimonials from "@/components/Testimonials";
import Instructors from "@/components/Instructors";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Booklets />
      <WhyChooseUs />
      <Subjects />
      <PastPapers />
      <CheatsheetSection />
      <RecordedCoursesSection />
      <Testimonials />
      <Instructors />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default Index;