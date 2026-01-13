import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/edexceleasy_/", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/edexceleasy", label: "Facebook" },
    { icon: GoogleIcon, href: "https://share.google/HTTtw4fviuWeKmZDD", label: "Google" },
  ];

  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Brand */}
          <a href="#" className="inline-flex items-center gap-2 mb-6">
            <img src={logo} alt="Edexcel Easy" className="w-12 h-12 object-contain" />
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
                target="_blank"
                rel="noopener noreferrer"
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