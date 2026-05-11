import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";

const BlogSection = () => {
  const posts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="py-16 bg-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#1E3A8A] mb-3">
            Latest from our{" "}
            <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">
              Blog
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tips, guides and insights to help you ace your Edexcel exams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex flex-col bg-card rounded-xl border-2 border-[#1E3A8A] overflow-hidden hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] transition-all"
            >
              <div className="p-6 flex flex-col flex-1">
                <span className="inline-block self-start px-3 py-1 mb-3 text-xs font-semibold rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A]">
                  {post.category}
                </span>
                <h3 className="font-heading font-bold text-lg text-[#1E3A8A] mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/blog">
            <Button className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white">
              View all posts
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;