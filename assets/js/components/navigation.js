'use strict';

/******************************************************************************
 * Navigation
 * Handles: hamburger toggle, header shrink on scroll, scroll-spy on sections.
 ******************************************************************************/

const init_navigation = () => {
  const header  = document.querySelector('[data-nav-header]');
  const toggle  = document.querySelector('[data-nav-toggle]');
  const menu    = document.querySelector('[data-nav-menu]');
  const navLinks = document.querySelectorAll('.site-nav__link, .mobile-nav__link');
  const sections = document.querySelectorAll('main > section[id]');

  if (!header || !toggle || !menu) return;


  // ── Hamburger toggle ─────────────────────

  const close_menu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
  };

  const open_menu = () => {
    toggle.setAttribute('aria-expanded', 'true');
    menu.classList.add('is-open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    isOpen ? close_menu() : open_menu();
  });

  // Close mobile menu when a nav link is clicked
  menu.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
      close_menu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      close_menu();
      toggle.focus();
    }
  });


  // ── Header shrink on scroll ───────────────

  const handle_scroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handle_scroll, { passive: true });
  // Run once on init in case page is loaded scrolled down
  handle_scroll();


  // ── Scroll-spy ────────────────────────────
  // Updates .is-active on nav links matching the current visible section.

  if (!('IntersectionObserver' in window)) return;

  const set_active_link = (id) => {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${id}`) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
  };

  const spy_observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          set_active_link(entry.target.id);
        }
      });
    },
    {
      // Trigger when section is ~40% into view from the top
      rootMargin: `-${header.offsetHeight}px 0px -55% 0px`,
      threshold: 0,
    }
  );

  sections.forEach(section => spy_observer.observe(section));
};
