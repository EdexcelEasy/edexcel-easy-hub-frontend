import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "A-Level Student",
    content: "Edexcel Easy helped me achieve an A* in Mathematics. The study materials are incredibly well-organized and the past paper explanations are so clear!",
    rating: 5,
    avatar: "SA",
  },
  {
    name: "Mohammed Khan",
    role: "IGCSE Student",
    content: "I was struggling with Physics until I found this platform. The video lessons made everything click. Scored an A in my finals!",
    rating: 5,
    avatar: "MK",
  },
  {
    name: "Emily Chen",
    role: "A-Level Student",
    content: "The progress tracking feature is amazing. I could see exactly where I needed to improve and focused my revision accordingly. Highly recommend!",
    rating: 5,
    avatar: "EC",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-accent text-accent-foreground font-medium text-sm mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            What Our Students Say
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Join thousands of students who have achieved their academic goals with Edexcel Easy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20"
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <Quote className="w-5 h-5 text-accent-foreground" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-primary-foreground/90 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-primary-foreground/70">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
