'use strict';

/******************************************************************************
 * DOM Helpers
 * Tiny utilities for showing/clearing inline field error messages.
 * Selected by aria-describedby relationship, not class names.
 ******************************************************************************/

/**
 * Show an error message in a field's error span.
 * Also marks the input as invalid for assistive technologies.
 *
 * @param {HTMLElement} input - The form field
 * @param {string} message - The error text to display
 */
const show_error = (input, message) => {
  const errorId = input.getAttribute('aria-describedby');
  const errorEl = errorId ? document.getElementById(errorId) : null;

  input.setAttribute('aria-invalid', 'true');
  if (errorEl) {
    errorEl.textContent = message;
  }
};

/**
 * Clear the error state from a field.
 *
 * @param {HTMLElement} input - The form field
 */
const clear_error = (input) => {
  const errorId = input.getAttribute('aria-describedby');
  const errorEl = errorId ? document.getElementById(errorId) : null;

  input.removeAttribute('aria-invalid');
  if (errorEl) {
    errorEl.textContent = '';
  }
};
