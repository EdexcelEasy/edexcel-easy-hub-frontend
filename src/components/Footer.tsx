import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Brand */}
          <a href="#" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-accent-foreground" />
            </div>
            <span className="font-heading text-xl font-bold">
              Edexcel <span className="text-accent">Easy</span>
            </span>
          </a>
          <p className="text-primary-foreground/70 mb-6">
            Empowering students to achieve academic excellence through quality education 
            and comprehensive study resources.
          </p>
          
          {/* Contact Info */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center justify-center gap-3 text-sm text-primary-foreground/70">
              <Mail className="w-4 h-4" />
              <span>mohimaahmed01@gmail.com</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-sm text-primary-foreground/70">
              <Mail className="w-4 h-4" />
              <span>mrimmoaeeahmed@gmail.com</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-sm text-primary-foreground/70">
              <Phone className="w-4 h-4" />
              <span>+8801842900265</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-sm text-primary-foreground/70">
              <MapPin className="w-4 h-4" />
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-sm text-primary-foreground/60">
            © {currentYear} Edexcel Easy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;