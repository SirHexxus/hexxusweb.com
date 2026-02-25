'use strict';

/******************************************************************************
 * Contact API Service
 * Change API_ENDPOINT below when the Node.js backend is deployed.
 ******************************************************************************/

// TODO: Update this URL when the backend container is live at api.hexxusweb.com
const API_ENDPOINT = 'https://api.hexxusweb.com/contact';

/**
 * Submit the contact form data to the backend.
 *
 * @param {{ name: string, email: string, subject: string, message: string }} data
 * @returns {Promise<{ ok: boolean, message: string }>}
 */
const submit_contact = async (data) => {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const body = await response.json().catch(() => ({}));

  return {
    ok: response.ok,
    message: body.message ?? (response.ok ? 'Message sent.' : 'Submission failed.'),
  };
};
