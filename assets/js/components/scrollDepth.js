'use strict';

/******************************************************************************
 * Scroll Depth + Portfolio Card Views
 * Tracks scroll depth thresholds and which portfolio project cards enter view.
 ******************************************************************************/

const init_scroll_depth = () => {
  // ── Scroll depth ─────────────────────────────────────────────────────────

  const reached = new Set();
  const THRESHOLDS = [25, 50, 75, 90];

  const handle_scroll = () => {
    const scrolled = window.scrollY + window.innerHeight;
    const total = document.documentElement.scrollHeight;
    const pct = Math.round((scrolled / total) * 100);

    for (const threshold of THRESHOLDS) {
      if (pct >= threshold && !reached.has(threshold)) {
        reached.add(threshold);
        window.umami?.track('scroll-depth', { depth: `${threshold}%` });
      }
    }
  };

  window.addEventListener('scroll', handle_scroll, { passive: true });


  // ── Portfolio card views ──────────────────────────────────────────────────

  const cards = document.querySelectorAll('[data-project-id]');
  if (!cards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const projectId = entry.target.dataset.projectId;
        window.umami?.track('portfolio-card-view', { project: projectId });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  cards.forEach((card) => observer.observe(card));
};

init_scroll_depth();
