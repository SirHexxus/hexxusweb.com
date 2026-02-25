'use strict';

/******************************************************************************
 * main.js — Application entry point
 * Initializes all components after the DOM is ready.
 ******************************************************************************/

const initialize = () => {
  // Set copyright year dynamically so it never needs manual updating
  const yearEl = document.querySelector('[data-copyright-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Initialize components
  init_scroll_reveal();
  init_navigation();
  init_contact_form();
};

document.addEventListener('DOMContentLoaded', initialize);
