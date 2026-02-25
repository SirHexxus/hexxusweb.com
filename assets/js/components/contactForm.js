'use strict';

/******************************************************************************
 * Contact Form
 * Validates fields, calls submit_contact(), manages loading/success/error UI.
 *
 * Dependencies (loaded before this file in index.html):
 *   - validate.js  → get_field_error()
 *   - dom.js       → show_error(), clear_error()
 *   - contactApi.js → submit_contact()
 ******************************************************************************/

const init_contact_form = () => {
  const form        = document.querySelector('[data-contact-form]');
  const submitBtn   = document.querySelector('[data-form-submit]');
  const errorBanner = document.querySelector('[data-form-error-banner]');

  if (!form) return;

  const fields = Array.from(form.querySelectorAll('input, textarea'));


  // ── Per-field inline validation on blur ───

  fields.forEach(field => {
    field.addEventListener('blur', () => {
      const error = get_field_error(field);
      if (error) {
        show_error(field, error);
      } else {
        clear_error(field);
      }
    });

    // Clear error as soon as the user starts correcting the field
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') {
        clear_error(field);
      }
    });
  });


  // ── Validate all fields, return true if all pass ──

  const validate_all = () => {
    let allValid = true;
    let firstInvalid = null;

    fields.forEach(field => {
      const error = get_field_error(field);
      if (error) {
        show_error(field, error);
        allValid = false;
        if (!firstInvalid) firstInvalid = field;
      } else {
        clear_error(field);
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
    }

    return allValid;
  };


  // ── UI state helpers ──────────────────────

  const set_loading = (isLoading) => {
    if (isLoading) {
      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;
    } else {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
    }
  };

  const show_success = () => {
    form.classList.add('is-submitted');
  };

  const show_error_banner = () => {
    errorBanner.classList.remove('hidden');
  };

  const hide_error_banner = () => {
    errorBanner.classList.add('hidden');
  };


  // ── Form submission ───────────────────────

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    hide_error_banner();

    if (!validate_all()) return;

    const data = {
      name:    form.elements['name'].value.trim(),
      email:   form.elements['email'].value.trim(),
      subject: form.elements['subject'].value.trim(),
      message: form.elements['message'].value.trim(),
    };

    set_loading(true);

    try {
      const result = await submit_contact(data);

      if (result.ok) {
        show_success();
      } else {
        show_error_banner();
      }
    } catch {
      show_error_banner();
    } finally {
      set_loading(false);
    }
  });
};
