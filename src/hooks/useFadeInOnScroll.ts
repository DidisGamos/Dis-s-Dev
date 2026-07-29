import { useEffect, useRef, type RefObject } from "react";

/**
 * Attache un IntersectionObserver au ref donné.
 * Quand l'élément entre dans le viewport, la classe `is-visible` est ajoutée.
 * @param threshold - pourcentage visible pour déclencher (default: 0.15)
 */
export function useFadeInOnScroll<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15,
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el); // only animate once
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

/**
 * Version pour observer TOUS les éléments `.fade-in-section` dans la page.
 * Appeler une seule fois dans le composant racine.
 */
export function useGlobalFadeIn() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in-section");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
