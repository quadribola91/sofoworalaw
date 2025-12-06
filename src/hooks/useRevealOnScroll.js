import { useEffect } from "react";

export default function useRevealOnScroll(options = {}) {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15,
      ...options,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.add("revealed");
        } else {
          el.classList.remove("revealed");
        }
      });
    }, observerOptions);

    const els = Array.from(document.querySelectorAll(".reveal-on-scroll"));
    els.forEach((el) => observer.observe(el));

    return () => {
      els.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [options]);
}
