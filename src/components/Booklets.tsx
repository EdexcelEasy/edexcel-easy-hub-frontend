import { Link } from "react-router-dom";
import p1 from "@/assets/booklets/p1.jpg";
import p2 from "@/assets/booklets/p2.jpg";
import p3 from "@/assets/booklets/p3.jpg";
import p4 from "@/assets/booklets/p4.jpg";

const booklets = [
  { title: "Pure Mathematics 1 [P1]", img: p1 },
  { title: "Pure Mathematics 2 [P2]", img: p2 },
  { title: "Pure Mathematics 3 [P3]", img: p3 },
  { title: "Pure Mathematics 4 [P4]", img: p4 },
];

const Booklets = () => {
  return (
    <section id="worksheets" className="py-16 bg-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#1E3A8A] mb-3">
            Chapterwise{" "}
            <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">
              Booklets
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our chapterwise worksheet booklets. Click any booklet to view pricing.
          </p>
        </div>

        <div className="overflow-x-auto pb-4 -mx-4 px-4 scroll-smooth">
          <div className="flex gap-6 min-w-min">
            {booklets.map((b) => (
              <Link
                key={b.title}
                to="/pricing"
                className="group flex-shrink-0 w-56 sm:w-64 rounded-xl border-2 border-[#1E3A8A] overflow-hidden bg-card hover:shadow-[0_8px_30px_rgba(250,204,21,0.4)] transition-all"
                aria-label={`${b.title} – view pricing`}
              >
                <div className="aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={b.img}
                    alt={`${b.title} booklet cover`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-heading font-semibold text-sm text-[#1E3A8A]">
                    {b.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booklets;