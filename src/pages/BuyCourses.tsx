import { motion } from "framer-motion";
import { ArrowLeft, GraduationCap, BookOpen, Atom, FlaskConical, Calculator, Pi, Monitor, Code, Dna, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const WHATSAPP_NUMBER = "8801842900265";

const igcseSubjects = [
  { name: "Physics", icon: Atom },
  { name: "Chemistry", icon: FlaskConical },
  { name: "Maths B", icon: Calculator },
  { name: "Maths A", icon: Calculator },
  { name: "Further Pure Maths", icon: Pi },
  { name: "ICT", icon: Monitor },
  { name: "Computer Science", icon: Code },
];

const ialSubjects = [
  { name: "Physics", icon: Atom },
  { name: "Maths", icon: Calculator },
  { name: "Chemistry", icon: FlaskConical },
  { name: "IT", icon: Monitor },
  { name: "Biology", icon: Dna },
];

const BuyCourses = () => {
  const getWhatsAppLink = (curriculum: string, subject: string) => {
    const text = encodeURIComponent(
      `Hi! I would like to buy the ${curriculum} - ${subject} course. Could you please share the enrolment details and pricing?`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-pattern-grid bg-pattern-fade pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(222_72%_33%_/_0.06)_0%,_transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(48_96%_53%_/_0.06)_0%,_transparent_60%)] pointer-events-none" />

      <main className="pt-28 pb-24 relative z-10">
        <div className="container mx-auto px-4">
          
          {/* Back Button */}
          <Link to="/">
            <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80 group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </Link>

          {/* Page Title & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-wider mb-4 border border-primary/20">
              Premium Courses
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-[#1E3A8A] mb-6 tracking-tight leading-none">
              Explore & Buy{" "}
              <span className="inline-block px-4 py-2 border-3 border-[#FACC15] bg-[#FACC15]/10 rounded-2xl shadow-inner">
                Courses
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
              Unlock top scores with our comprehensive exam preparation courses. Select a subject below to enroll and chat with us on WhatsApp.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* IGCSE Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-card/75 backdrop-blur-md border border-border/80 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-[#1E3A8A] hover:shadow-[0_20px_50px_rgba(30,58,138,0.15)] transition-all group"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-[#1E3A8A] group-hover:text-white transition-all duration-300">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-[#1E3A8A]">
                      IGCSE Courses
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">Aged 14-16 Syllabus prep</p>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  Excel in your International General Certificate of Secondary Education exams with our deep-dive worksheets, expert-vetted notes, and full syllabus courses.
                </p>

                <div className="h-px bg-border/60 mb-6" />

                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-3">
                    Available Subjects (Click to enroll):
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {igcseSubjects.map((subj) => (
                      <a
                        key={subj.name}
                        href={getWhatsAppLink("IGCSE", subj.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs md:text-sm font-medium bg-background hover:bg-[#1E3A8A] border border-border hover:border-[#1E3A8A] hover:text-white hover:scale-105 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                      >
                        <subj.icon className="w-3.5 h-3.5" />
                        {subj.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* IAL Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-card/75 backdrop-blur-md border border-border/80 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-[#1E3A8A] hover:shadow-[0_20px_50px_rgba(30,58,138,0.15)] transition-all group"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-[#1E3A8A] group-hover:text-white transition-all duration-300">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-[#1E3A8A]">
                      IAL Courses
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">International A-Levels prep</p>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  Prepare comprehensively for your university entrance exams with top-tier subject courses, mock questions, and highly structured topic breakdowns.
                </p>

                <div className="h-px bg-border/60 mb-6" />

                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-3">
                    Available Subjects (Click to enroll):
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {ialSubjects.map((subj) => (
                      <a
                        key={subj.name}
                        href={getWhatsAppLink("IAL", subj.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs md:text-sm font-medium bg-background hover:bg-[#1E3A8A] border border-border hover:border-[#1E3A8A] hover:text-white hover:scale-105 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                      >
                        <subj.icon className="w-3.5 h-3.5" />
                        {subj.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BuyCourses;
