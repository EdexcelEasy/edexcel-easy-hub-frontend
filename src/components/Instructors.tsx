import { motion } from "framer-motion";
import { Youtube, ExternalLink } from "lucide-react";
import instructorMohima from "@/assets/instructor-mohima.png";
import instructorTabeeb from "@/assets/instructor-tabeeb.png";

const instructors = [
  {
    name: "Mohima Ahmed Sneha",
    role: "Physics & Maths Teacher",
    experience: "7+ years of experience",
    youtube: {
      label: "Edexcel Easy",
      url: "https://www.youtube.com/@EdexcelEasy_MohimaAhmedSneha",
    },
    image: instructorMohima,
  },
  {
    name: "Tabeeb Hussain",
    role: "Biology Teacher",
    experience: "4+ years of experience",
    youtube: null,
    image: instructorTabeeb,
  },
];

const Instructors = () => {
  return (
    <section id="instructors" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Expert Guidance
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Meet Your{" "}
            <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">
              Instructors
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn from experienced educators dedicated to your academic success.
          </p>
        </motion.div>

        {/* Instructors Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 border border-border hover:border-[#1E3A8A] hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] transition-all text-center"
            >
              {/* Circular Photo Frame */}
              <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-[#1E3A8A] overflow-hidden bg-muted">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h3 className="font-heading font-bold text-xl text-[#1E3A8A] mb-2">
                {instructor.name}
              </h3>

              {/* Role */}
              <p className="text-primary font-medium mb-2">{instructor.role}</p>

              {/* Experience */}
              <p className="text-muted-foreground text-sm mb-4">
                {instructor.experience}
              </p>

              {/* YouTube Link */}
              {instructor.youtube && (
                <a
                  href={instructor.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#1E3A8A] hover:text-[#FACC15] transition-colors group"
                >
                  <Youtube className="w-4 h-4" />
                  <span>View on YouTube - {instructor.youtube.label}</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructors;
