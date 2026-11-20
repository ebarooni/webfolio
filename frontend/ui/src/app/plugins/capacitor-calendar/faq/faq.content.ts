/*
 * The answers point to the plugin documentation. They state no versions,
 * platforms or behavior that can change with a release. Text between
 * backticks shows as code. The FAQPage JSON-LD uses the same answers
 * without the backticks.
 */

export type FaqEntry = Readonly<{
  id: string;
  question: string;
  answer: string;
}>;

export const FAQ: readonly FaqEntry[] = [
  {
    id: 'what',
    question: 'What is Capacitor Calendar?',
    answer:
      'An open source Capacitor plugin that connects your app to the native calendar of the device. It is published on npm as `@ebarooni/capacitor-calendar`.',
  },
  {
    id: 'install',
    question: 'How do I install it?',
    answer:
      'Run `npm install @ebarooni/capacitor-calendar`, then `npx cap sync`. The README tells you which npm tag matches your Capacitor version.',
  },
  {
    id: 'platforms',
    question: 'Which platforms and features are supported?',
    answer:
      'The “Features and platforms” table in the README is always current. It lists each capability for iOS, Android and the web.',
  },
  {
    id: 'permissions',
    question: 'Which permissions does my app need?',
    answer:
      'The “Setup” section of the README lists the Info.plist keys for iOS and the permissions for Android. Add only the ones your app uses.',
  },
  {
    id: 'docs',
    question: 'Where is the API reference?',
    answer:
      'On the documentation site and in the “API” section of the README. Both are generated from the TypeScript definitions of the plugin.',
  },
  {
    id: 'frameworks',
    question: 'Does it work with Ionic, Angular, React or Vue?',
    answer:
      'Yes. It is a Capacitor plugin, so it works in any Capacitor app, whatever framework renders the UI.',
  },
  {
    id: 'support',
    question: 'Where can I ask a question or report a bug?',
    answer:
      'Open an issue in the GitHub repository. The changelog and the breaking changes file show what changed in each release.',
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
