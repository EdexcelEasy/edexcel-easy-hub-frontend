import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const igcseSubjects = [
  { name: "Chemistry", slug: "chemistry" },
  { name: "Physics", slug: "physics" },
  { name: "ICT", slug: "ict" },
  { name: "Computer Science", slug: "computer-science" },
  { name: "Mathematics A", slug: "mathematics-a" },
  { name: "Mathematics B", slug: "mathematics-b" },
  { name: "Further Pure Mathematics", slug: "further-pure-mathematics" },
  { name: "Biology", slug: "biology" },
  { name: "Human Biology", slug: "human-biology" },
];

const ialSubjects = [
  { name: "Chemistry", slug: "chemistry" },
  { name: "Physics", slug: "physics" },
  { name: "Mathematics", slug: "mathematics" },
  { name: "Further Mathematics", slug: "further-mathematics" },
  { name: "Biology", slug: "biology" },
];

// Subjects with past papers available
const igcsePastPaperSubjects = [
  { name: "Physics", slug: "physics" },
  { name: "Chemistry", slug: "chemistry" },
  { name: "Mathematics B", slug: "mathematics-b" },
  { name: "Mathematics A", slug: "mathematics-a" },
  { name: "Further Pure Mathematics", slug: "further-pure-mathematics" },
  { name: "Biology", slug: "biology" },
  { name: "Human Biology", slug: "human-biology" },
  { name: "ICT", slug: "ict" },
  { name: "Computer Science", slug: "computer-science" },
];

const ialPastPaperSubjects = [
  { name: "Physics", slug: "physics" },
  { name: "Mathematics", slug: "mathematics" },
  { name: "Biology", slug: "biology" },
  { name: "IT", slug: "it" },
];

const igcseModularPastPaperSubjects = [
  { name: "Mathematics A", slug: "mathematics-a" },
  { name: "Biology", slug: "biology" },
  { name: "Chemistry", slug: "chemistry" },
  { name: "Physics", slug: "physics" },
  { name: "Science (Double Awards)", slug: "science-double-awards" },
  { name: "English Language B", slug: "english-language-b" },
  { name: "Accounting", slug: "accounting" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Edexcel Easy" className="w-12 h-12 object-contain" />
              <span className="font-heading text-xl font-bold text-[#1E3A8A]">
                Edexcel Easy
              </span>
            </Link>
            <div className="hidden sm:flex items-center gap-2">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#1877F2] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#E4405F] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#FF0000] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#4285F4] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              </a>
            </div>
          </div>

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
                            <Link
                              key={subject.slug}
                              to={`/igcse/${subject.slug}`}
                              className="block text-sm text-muted-foreground hover:text-[#1E3A8A] hover:underline transition-all py-1"
                            >
                              {subject.name}
                            </Link>
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
                            <Link
                              key={subject.slug}
                              to={`/ial/${subject.slug}`}
                              className="block text-sm text-muted-foreground hover:text-[#1E3A8A] hover:underline transition-all py-1"
                            >
                              {subject.name}
                            </Link>
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
                    className="absolute top-full left-0 mt-2 w-72 max-h-[70vh] bg-card border border-border rounded-xl shadow-lg z-50 overflow-y-auto"
                  >
                    <div className="p-4">
                      {/* IGCSE Section */}
                      <div className="mb-4">
                        <Link
                          to="/igcse-past-papers"
                          className="block font-heading font-bold text-[#1E3A8A] mb-2 hover:text-primary"
                        >
                          IGCSE
                        </Link>
                        <div className="pl-3 space-y-1">
                          {igcsePastPaperSubjects.map((subject) => (
                            <Link
                              key={subject.slug}
                              to={`/igcse-past-papers/${subject.slug}`}
                              className="block text-sm text-muted-foreground hover:text-[#1E3A8A] hover:underline transition-all py-1"
                            >
                              {subject.name}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-border my-3" />

                      {/* IAL Section */}
                      <div>
                        <Link
                          to="/ial-past-papers"
                          className="block font-heading font-bold text-[#1E3A8A] mb-2 hover:text-primary"
                        >
                          IAL
                        </Link>
                        <div className="pl-3 space-y-1">
                          {ialPastPaperSubjects.map((subject) => (
                            <Link
                              key={subject.slug}
                              to={`/ial-past-papers/${subject.slug}`}
                              className="block text-sm text-muted-foreground hover:text-[#1E3A8A] hover:underline transition-all py-1"
                            >
                              {subject.name}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-border my-3" />

                      {/* IGCSE Modular Section */}
                      <div>
                        <Link
                          to="/igcse-modular-past-papers"
                          className="block font-heading font-bold text-[#1E3A8A] mb-2 hover:text-primary"
                        >
                          IGCSE Modular
                        </Link>
                        <div className="pl-3 space-y-1">
                          {igcseModularPastPaperSubjects.map((subject) => (
                            <Link
                              key={subject.slug}
                              to={`/igcse-modular-past-papers/${subject.slug}`}
                              className="block text-sm text-muted-foreground hover:text-[#1E3A8A] hover:underline transition-all py-1"
                            >
                              {subject.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cheatsheets */}
            <Link
              to="/cheatsheets"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Cheatsheets
            </Link>

            {/* Instructors */}
            <a
              href="#instructors"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Instructors
            </a>

            {/* Blog */}
            <Link
              to="/blog"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Blog
            </Link>

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
                  <Link to="/igcse-past-papers" onClick={() => setIsOpen(false)} className="block text-sm font-bold text-[#1E3A8A]">IGCSE</Link>
                  <div className="pl-3 space-y-1">
                    {igcsePastPaperSubjects.map((subject) => (
                      <Link
                        key={subject.slug}
                        to={`/igcse-past-papers/${subject.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="block text-sm text-muted-foreground hover:text-[#1E3A8A]"
                      >
                        {subject.name}
                      </Link>
                    ))}
                  </div>
                  <Link to="/ial-past-papers" onClick={() => setIsOpen(false)} className="block text-sm font-bold text-[#1E3A8A]">IAL</Link>
                  <div className="pl-3 space-y-1">
                    {ialPastPaperSubjects.map((subject) => (
                      <Link
                        key={subject.slug}
                        to={`/ial-past-papers/${subject.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="block text-sm text-muted-foreground hover:text-[#1E3A8A]"
                      >
                        {subject.name}
                      </Link>
                    ))}
                  </div>
                  <Link to="/igcse-modular-past-papers" onClick={() => setIsOpen(false)} className="block text-sm font-bold text-[#1E3A8A] mt-2">IGCSE Modular</Link>
                  <div className="pl-3 space-y-1">
                    {igcseModularPastPaperSubjects.map((subject) => (
                      <Link
                        key={subject.slug}
                        to={`/igcse-modular-past-papers/${subject.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="block text-sm text-muted-foreground hover:text-[#1E3A8A]"
                      >
                        {subject.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                to="/cheatsheets"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Cheatsheets
              </Link>
              <a
                href="#instructors"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Instructors
              </a>
              <Link
                to="/blog"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
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