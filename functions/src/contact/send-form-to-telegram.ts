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
      const sanitizedName = sanitizeName(name);
      const sanitizedMessage = sanitizeMessage(message);

      const title = '<b>📬 New Message</b>';
      const nameElement = `<b>Name:</b> ${sanitizedName}`;
      const emailElement = `<b>Email:</b> <a href="mailto:${email}">${email}</a>`;
      const messageElement = `<b>Message:</b>\n${sanitizedMessage}`;
      const htmlMessage = `${title}\n${nameElement}\n${emailElement}\n${messageElement}`;
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN.value()}/sendMessage`;

      await axios.post(url, {
        chat_id: TELEGRAM_CHAT_ID.value(),
        parse_mode: 'HTML',
        text: htmlMessage,
      });
      return { success: true };
    } catch {
      throw new HttpsError('internal', 'Failed to send Telegram message.');
    }
  },
);

const sanitizeMessage = (message: string): string => {
  return message
    .trim()
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '') // remove control chars but keep \n and \r
    .replace(/<[^>]*>/g, '') // remove HTML tags
    .replace(/[\u{1F600}-\u{1F6FF}]/gu, '') // remove emojis (optional)
    .replace(/[^\S\r\n]+/g, ' ') // collapse horizontal whitespace (but keep newlines)
    .replace(/^[ \t]+|[ \t]+$/gm, ''); // trim spaces at start/end of each line
};

const sanitizeName = (name: string): string => {
  return name
    .trim()
    .replace(/[\u0000-\u001F\u007F]/g, '') // remove control chars
    .replace(/<[^>]*>/g, '') // strip HTML tags
    .replace(/[\u{1F600}-\u{1F6FF}]/gu, '') // optionally remove emojis
    .replace(/[^\p{L}\p{M}\p{Zs}'\-]/gu, '') // remove symbols except letters, marks, spaces, apostrophes, hyphens
    .replace(/\s+/g, ' '); // collapse multiple spaces
};
