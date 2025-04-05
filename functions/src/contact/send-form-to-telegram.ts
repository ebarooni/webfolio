import {
  CallableRequest,
  HttpsError,
  onCall,
} from 'firebase-functions/v2/https';
import axios from 'axios';
import { defineSecret } from 'firebase-functions/params';

interface ContactFormData {
  email?: string;
  message?: string;
  name?: string;
}

const TELEGRAM_BOT_TOKEN = defineSecret('TELEGRAM_BOT_TOKEN');
const TELEGRAM_CHAT_ID = defineSecret('TELEGRAM_CHAT_ID');

export const sendFormToTelegram = onCall(
  { region: 'europe-west1', secrets: [TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID] },
  async (request: CallableRequest<ContactFormData>) => {
    const email = request.data.email;
    const message = request.data.message;
    const name = request.data.name;

    if (!email || !message || !name) {
      throw new HttpsError('invalid-argument', 'Form data not complete.');
    }

    try {
      const htmlMessage = `
        <b>📬 New Portfolio Message</b>\n<b>Name:</b> ${name}\n
        <b>Email:</b> <a href="mailto:${email}">${email}</a>\n
        <b>Message:</b>\n${message}
      `;
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN.value()}/sendMessage`;

      await axios.post(url, {
        chat_id: TELEGRAM_CHAT_ID,
        parse_mode: 'Markdown',
        text: htmlMessage,
      });
    } catch {
      throw new HttpsError('internal', 'Failed to send Telegram message.');
    }
  },
);
