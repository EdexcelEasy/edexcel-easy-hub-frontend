import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, BookOpen, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const igcseSubjects = [
  "Chemistry",
  "Physics", 
  "ICT",
  "Computer Science",
  "Mathematics A",
  "Mathematics B",
  "Further Pure Mathematics",
  "Biology",
  "Human Biology",
];

const ialSubjects = [
  "Chemistry",
  "Physics",
  "Mathematics",
  "Further Mathematics",
  "Biology",
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-[#1E3A8A] flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="font-heading text-xl font-bold text-[#1E3A8A]">
              Edexcel Easy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Home */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Home
            </Link>

            {/* Subjects Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown("subjects")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                Subjects
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {activeDropdown === "subjects" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-72 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden"
                  >
                    <div className="p-4">
                      {/* IGCSE Section */}
                      <div className="mb-4">
                        <Link
                          to="/igcse-subjects"
                          className="block font-heading font-bold text-[#1E3A8A] mb-2 hover:text-primary"
                        >
                          IGCSE
                        </Link>
                        <div className="pl-3 space-y-1">
                          {igcseSubjects.map((subject) => (
                            <a
                              key={subject}
                              href="#"
                              className="block text-sm text-muted-foreground hover:text-[#1E3A8A] hover:underline transition-all py-1"
                            >
                              {subject}
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-border my-3" />

                      {/* IAL Section */}
                      <div>
                        <Link
                          to="/ial-subjects"
                          className="block font-heading font-bold text-[#1E3A8A] mb-2 hover:text-primary"
                        >
                          IAL
                        </Link>
                        <div className="pl-3 space-y-1">
                          {ialSubjects.map((subject) => (
                            <a
                              key={subject}
                              href="#"
                              className="block text-sm text-muted-foreground hover:text-[#1E3A8A] hover:underline transition-all py-1"
                            >
                              {subject}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Past Papers Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown("papers")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                Past Papers
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {activeDropdown === "papers" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden"
                  >
                    <div className="p-4 space-y-2">
                      <a
                        href="#"
                        className="block font-heading font-bold text-[#1E3A8A] hover:underline py-1"
                      >
                        IGCSE
                      </a>
                      <a
                        href="#"
                        className="block font-heading font-bold text-[#1E3A8A] hover:underline py-1"
                      >
                        IAL
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Instructors */}
            <a
              href="#instructors"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Instructors
            </a>

            {/* Contact */}
            <a
              href="#contact"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link
                to="/"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              
              {/* Mobile Subjects */}
              <div className="py-2">
                <span className="text-sm font-medium text-foreground/80">Subjects</span>
                <div className="pl-4 mt-2 space-y-2">
                  <Link
                    to="/igcse-subjects"
                    className="block text-sm font-bold text-[#1E3A8A]"
                    onClick={() => setIsOpen(false)}
                  >
                    IGCSE
                  </Link>
                  <Link
                    to="/ial-subjects"
                    className="block text-sm font-bold text-[#1E3A8A]"
                    onClick={() => setIsOpen(false)}
                  >
                    IAL
                  </Link>
                </div>
              </div>

              {/* Mobile Past Papers */}
              <div className="py-2">
                <span className="text-sm font-medium text-foreground/80">Past Papers</span>
                <div className="pl-4 mt-2 space-y-2">
                  <a href="#" className="block text-sm font-bold text-[#1E3A8A]">IGCSE</a>
                  <a href="#" className="block text-sm font-bold text-[#1E3A8A]">IAL</a>
                </div>
              </div>

              <a
                href="#instructors"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Instructors
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;