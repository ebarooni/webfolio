/*
 * Every answer comes from the README of @ebarooni/capacitor-calendar.
 * Text between backticks shows as code. The FAQPage JSON-LD uses the same
 * answers without the backticks.
 */

export type FaqEntry = Readonly<{
  id: string;
  question: string;
  answer: string;
}>;

export const FAQ: readonly FaqEntry[] = [
  {
    id: 'platforms',
    question: 'Which platforms does the plugin support?',
    answer:
      'iOS and Android get the full native calendar: create, edit, list and delete events, and manage calendars and permissions. iOS also supports reminders. On the web, `createEvent` and `createEventWithPrompt` build a downloadable `.ics` file. They do not write to a device calendar.',
  },
  {
    id: 'capacitor-versions',
    question: 'Which Capacitor versions are supported?',
    answer:
      'Match the npm tag to your Capacitor major. Use the `latest` tag for Capacitor 8 and the `latest-7` tag for Capacitor 7. Both are intended to stay in feature parity. The plugin has been available since Capacitor 5.',
  },
  {
    id: 'ios-17',
    question: 'How does the plugin handle the iOS 17 calendar access levels?',
    answer:
      'Since iOS 17, Apple requires separate Info.plist keys for write-only and full calendar access. Request only what you need: `requestWriteOnlyCalendarAccess` to add events, or `requestFullCalendarAccess` to read and manage them. Add only the usage description keys that your app needs.',
  },
  {
    id: 'reminders',
    question: 'Can I create reminders on Android?',
    answer:
      'No. Reminders and reminder lists use Apple Reminders, so they are available on iOS only. On Android, the reminder permission checks resolve to `prompt`.',
  },
  {
    id: 'dates',
    question: 'Which date format does the plugin expect?',
    answer:
      'Dates are Unix timestamps in milliseconds, for example `Date.now() + 60 * 60 * 1000` for one hour from now.',
  },
  {
    id: 'prompt-id',
    question: 'Why does createEventWithPrompt return no id on Android?',
    answer:
      'On Android, `createEventWithPrompt` always returns `null` for the `id`. If you need the id, call `listEventsInRange` afterwards. On iOS, it returns the id when the user saves the event.',
  },
  {
    id: 'errors',
    question: 'How do I tell errors apart?',
    answer:
      'On Android and iOS, a rejected call can expose a stable `error.code`, such as `EB-CLDR-0020` for denied calendar access, and an `error.message` with the exact cause. Compare codes with the exported `CapacitorCalendarErrorCode` enum.',
  },
  {
    id: 'frameworks',
    question: 'Does it work with Ionic, Angular, React or Vue?',
    answer:
      'Yes. It is a Capacitor plugin, so it works in any Capacitor app, whatever framework renders the UI. Import `CapacitorCalendar` and call its methods.',
  },
  {
    id: 'ai',
    question: 'Can my AI coding assistant learn the API?',
    answer:
      'Yes. The plugin ships an official MCP server that gives AI coding assistants accurate, grounded knowledge of the plugin. It runs as a Docker image.',
  },
  {
    id: 'license',
    question: 'Is the plugin free to use?',
    answer:
      'Yes. It is open source under the MIT license, also for commercial apps.',
  },
];

export type AnswerPart = Readonly<{
  code: boolean;
  text: string;
}>;

/** Splits an answer at its backticks. Odd parts are code. */
export function answerParts(answer: string): AnswerPart[] {
  return answer
    .split('`')
    .map((text, index) => ({ code: index % 2 === 1, text }))
    .filter((part) => part.text.length > 0);
}

export function plainAnswer(answer: string): string {
  return answer.replaceAll('`', '');
}
