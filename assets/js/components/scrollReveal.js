'use strict';

/******************************************************************************
 * Scroll Reveal
 * IntersectionObserver adds .is-visible to [data-reveal] elements when they
 * enter the viewport. CSS handles the actual transition.
 * Respects prefers-reduced-motion.
 ******************************************************************************/

const init_scroll_reveal = () => {
  // If the user prefers reduced motion, skip — CSS already handles this
  // by making [data-reveal] immediately visible via @media rule in layout.css
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  if (!('IntersectionObserver' in window)) {
    // Fallback: make all reveal elements visible immediately
    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Unobserve once revealed — no need to watch further
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('[data-reveal]').forEach(el => {
    observer.observe(el);
  });
};
