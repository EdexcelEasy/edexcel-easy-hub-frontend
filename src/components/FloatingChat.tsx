import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone, Send } from "lucide-react";

const WHATSAPP = "8801842900265"; // intl format without +

const FloatingChat = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const sendWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi, I'm ${name || "a visitor"} from your website.\n\n${message}`
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank");
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#1E3A8A] text-white shadow-lg shadow-[#1E3A8A]/40 flex items-center justify-center hover:bg-[#1E3A8A]/90 transition-colors"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 fill-[#FACC15] stroke-[#1E3A8A]" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#FACC15] border-2 border-[#1E3A8A] animate-pulse" />
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 bg-card rounded-2xl border-2 border-[#1E3A8A] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#1E3A8A] text-white p-4">
              <h3 className="font-heading font-bold text-lg flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#FACC15] fill-[#FACC15]" />
                Get in Touch
              </h3>
              <p className="text-xs text-white/80 mt-1">
                We typically reply within a few hours.
              </p>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-[#1E3A8A]"
              />
              <textarea
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-[#1E3A8A] resize-none"
              />

              {/* Send button */}
              <button
                onClick={sendWhatsApp}
                disabled={!message.trim()}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#25D366] text-white text-sm font-medium hover:bg-[#25D366]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
                Send on WhatsApp
              </button>

              {/* Direct contact */}
              <div className="pt-3 border-t border-border">
                <a
                  href={`tel:+${WHATSAPP}`}
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-[#1E3A8A] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  +{WHATSAPP}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChat;
