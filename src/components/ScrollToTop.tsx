import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Retour en haut de page"
      className="fixed bottom-6 left-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/80 text-foreground backdrop-blur-md transition-all duration-300 hover:border-brand hover:bg-brand hover:text-brand-foreground hover:shadow-[var(--shadow-glow)] focus:outline-none focus:ring-2 focus:ring-brand animate-fade-in"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
