import Navbar from "@/components/Navbar";
import PastPapers from "@/components/PastPapers";
import Footer from "@/components/Footer";

const PastPapersIndex = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-16">
      <PastPapers />
    </main>
    <Footer />
  </div>
);

export default PastPapersIndex;
