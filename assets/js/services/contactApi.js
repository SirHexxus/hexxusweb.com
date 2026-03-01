'use strict';

/******************************************************************************
 * Contact API Service
 *
 * MVP:  Google Apps Script web app — intentionally left open (no auth, no rate
 *       limiting). This is a known trade-off: there is no way to secure a
 *       client-side secret on a static site. Worst-case blast radius is a
 *       spammy Google Sheet.
 *
 * Phase 2: Swap API_ENDPOINT for api.hexxusweb.com once the backend is live.
 *       At that point, add rate limiting, a honeypot field, and origin
 *       validation server-side. The form and validation code need no changes.
 ******************************************************************************/

const API_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyerLbYsev0Dh-hFIUCKORbCAi6xESkrjxh_cbuvQlNJCUreGJKmn2hfoLMhYRUQl9G8g/exec';

/**
 * Submit the contact form data to the backend.
 *
 * @param {{ name: string, email: string, subject: string, message: string }} data
 * @returns {Promise<{ ok: boolean, message: string }>}
 */
const submit_contact = async (data) => {
  // Apps Script requires text/plain to avoid a CORS preflight rejection.
  // The body is still valid JSON — the script parses it normally.
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(data),
  });

  const body = await response.json().catch(() => ({}));

  return {
    ok: response.ok,
    message: body.message ?? (response.ok ? 'Message sent.' : 'Submission failed.'),
  };
};
