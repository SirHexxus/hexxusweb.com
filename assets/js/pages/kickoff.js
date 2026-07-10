'use strict';

/******************************************************************************
 * Kickoff Form - 48-Hour Website
 *
 * Serializes the kickoff questionnaire into the shared contact endpoint
 * payload ({ name, email, subject, message }) so submissions land in the
 * same Google Sheet as contact form messages. Depends on contactApi.js.
 ******************************************************************************/

/******************************************************************************
 * Utility Functions
 ******************************************************************************/

const get_kickoff_value = (form, fieldName) => {
  const field = form.elements[fieldName];
  return field ? field.value.trim() : '';
};

const build_kickoff_message = (form) => {
  const lines = [
    `BUSINESS: ${get_kickoff_value(form, 'businessName')}`,
    `CONTACT: ${get_kickoff_value(form, 'contactName')} / ${get_kickoff_value(form, 'phone') || 'no phone given'}`,
    `DOMAIN: ${get_kickoff_value(form, 'domainStatus')} - ${get_kickoff_value(form, 'domainName') || 'none given'}`,
    '',
    `ABOUT THE BUSINESS:\n${get_kickoff_value(form, 'about')}`,
    '',
    `SITE GOAL:\n${get_kickoff_value(form, 'goal')}`,
    '',
    `SECTIONS + CONTENT:\n${get_kickoff_value(form, 'sections') || 'Not provided - draft placeholder copy for approval.'}`,
    '',
    `BRAND ASSETS:\n${get_kickoff_value(form, 'assets') || 'None linked - will email or needs defaults.'}`,
    '',
    `SITES THEY LIKE:\n${get_kickoff_value(form, 'inspiration') || 'None given.'}`,
  ];

  return lines.join('\n');
};

/******************************************************************************
 * Event Handlers
 ******************************************************************************/

const handle_kickoff_submit = async (event) => {
  event.preventDefault();

  const form = event.target;

  if (!form.reportValidity()) return;

  const submitBtn = form.querySelector('[data-form-submit]');
  const errorBanner = form.querySelector('[data-form-error-banner]');
  const successBlock = document.querySelector('[data-kickoff-success]');

  errorBanner.classList.add('hidden');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try {
    const result = await submit_contact({
      name: get_kickoff_value(form, 'contactName'),
      email: get_kickoff_value(form, 'email'),
      subject: `48-HOUR KICKOFF - ${get_kickoff_value(form, 'businessName')}`,
      message: build_kickoff_message(form),
    });

    if (!result.ok) {
      throw new Error(result.message);
    }

    form.hidden = true;
    successBlock.hidden = false;
    successBlock.focus();

  } catch (error) {
    console.error('Kickoff submission failed:', error);
    errorBanner.classList.remove('hidden');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Start the Clock';
  }
};

/******************************************************************************
 * Initialization
 ******************************************************************************/

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-kickoff-form]');
  if (form) {
    form.addEventListener('submit', handle_kickoff_submit);
  }
});
