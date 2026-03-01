/**
 * contact-sheet.gs
 * Google Apps Script — hexxusweb.com contact form receiver
 *
 * Setup:
 *   1. Open your Google Sheet.
 *   2. Extensions → Apps Script → paste this file.
 *   3. Deploy → New deployment → Web app.
 *      Execute as: Me | Who has access: Anyone
 *   4. Copy the deployment URL into API_ENDPOINT in contactApi.js.
 *   5. Redeploy (New deployment) any time you change this script.
 *
 * Sheet columns (auto-created on first submission):
 *   Timestamp | Name | Email | Subject | Message
 */

const SHEET_NAME = 'hexxusweb.com Contact Submissions';

// ---------------------------------------------------------------------------

const json_response = (payload, status) =>
  ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);

// ---------------------------------------------------------------------------

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    let sheet   = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Subject', 'Message']);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date().toISOString(),
      data.name    || '',
      data.email   || '',
      data.subject || '',
      data.message || '',
    ]);

    return json_response({ ok: true, message: 'Message sent.' });

  } catch (err) {
    return json_response({ ok: false, message: 'Server error.' });
  }
}
