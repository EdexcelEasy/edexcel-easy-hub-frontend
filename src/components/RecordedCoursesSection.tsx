import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, Database, Monitor } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "IGCSE IT Fundamentals",
    description: "Master the foundations of IT - from hardware basics to software concepts and data representation.",
    icon: Monitor,
    instructor: "Expert Instructors",
    lessons: "24 Videos",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    title: "IGCSE ICT Essentials",
    description: "Comprehensive coverage of information systems, networking, and digital communication principles.",
    icon: Database,
    instructor: "Expert Instructors",
    lessons: "28 Videos",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 3,
    title: "IAL IT Advanced Topics",
    description: "Deep dive into programming, databases, cybersecurity, and emerging technologies.",
    icon: Play,
    instructor: "Expert Instructors",
    lessons: "32 Videos",
    color: "from-indigo-500 to-blue-600",
  },
];

const RecordedCoursesSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#1E3A8A]/30"
          >
            <Play className="w-10 h-10 text-[#FACC15]" fill="#FACC15" strokeWidth={1.5} />
          </motion.div>

          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Recorded{" "}
            <span className="relative inline-block">
              <span className="relative z-10">IT & ICT Courses</span>
              <span className="absolute -bottom-1 left-0 right-0 h-3 bg-[#FACC15]/30 rounded-full" />
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Learn at your own pace with expertly-crafted video lessons covering IGCSE and IAL IT/ICT curricula.
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {courses.map((course, index) => {
            const Icon = course.icon;
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, borderColor: "rgba(250, 204, 21, 0.5)" }}
                className="group relative bg-card rounded-2xl p-6 border border-border transition-all duration-300 hover:shadow-[0_20px_40px_rgba(250,204,21,0.15)]"
              >
                {/* Decorative corners */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-3xl -z-0" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/5 to-transparent rounded-tr-3xl -z-0" />

                <div className="relative z-10">
                  {/* Icon Container */}
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-4 shadow-md`}
                  >
                    <Icon className="w-7 h-7 text-white" fill="white" strokeWidth={1.5} />
                  </motion.div>

                  {/* Course Title */}
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
                    <span className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {course.lessons}
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {course.instructor}
                    </span>
                  </div>

                  {/* Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white font-heading font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    View Course
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link to="/recorded-courses">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-card border-2 border-[#1E3A8A] text-foreground font-heading font-bold text-lg shadow-md hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] transition-all duration-300 cursor-pointer"
            >
              <Play className="w-5 h-5 text-[#FACC15]" fill="#FACC15" />
              Browse All Courses
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RecordedCoursesSection;
