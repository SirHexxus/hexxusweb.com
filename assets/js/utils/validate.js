'use strict';

/******************************************************************************
 * Validation Utilities
 * Pure functions — no DOM side effects. Return true/false or error strings.
 ******************************************************************************/

/**
 * Validate an email address using native browser constraint API.
 * @param {string} value
 * @returns {boolean}
 */
const validate_email = (value) => {
  const input = document.createElement('input');
  input.type = 'email';
  input.value = value;
  return input.checkValidity();
};

/**
 * Check that a value is non-empty after trimming whitespace.
 * @param {string} value
 * @returns {boolean}
 */
const validate_required = (value) => value.trim().length > 0;

/**
 * Return the appropriate error message for a form field,
 * or null if the field is valid.
 *
 * @param {HTMLInputElement|HTMLTextAreaElement} input
 * @returns {string|null}
 */
const get_field_error = (input) => {
  const value = input.value;

  if (!validate_required(value)) {
    return 'This field is required.';
  }

  if (input.type === 'email' && !validate_email(value)) {
    return 'Please enter a valid email address.';
  }

  return null;
};
