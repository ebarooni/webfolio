/*
 * The answers point to the plugin documentation. They state no versions,
 * platforms or behavior that can change with a release. Text between
 * backticks shows as code. The FAQPage JSON-LD uses the same answers
 * without the backticks.
 */

import { CopyShape, LocalizedCopy } from '../../../localization/localized-copy';

export type FaqEntry = Readonly<{
  id: string;
  question: string;
  answer: string;
}>;

const en = {
  label: 'FAQ',
  title: 'Questions developers ask first.',
  lead: 'Short answers, and where to find the details. The plugin documentation is always the current source.',
  entries: [
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
  ] as readonly FaqEntry[],
} as const;

type FaqCopy = CopyShape<typeof en>;

/** The README sections keep their English names, as on GitHub. */
export const FAQ_COPY: LocalizedCopy<FaqCopy> = {
  en,
  de: {
    label: 'FAQ',
    title: 'Was Entwickler zuerst fragen.',
    lead: 'Kurze Antworten und wo du die Details findest. Die Plugin-Dokumentation ist immer die aktuelle Quelle.',
    entries: [
      {
        id: 'what',
        question: 'Was ist Capacitor Calendar?',
        answer:
          'Ein Open-Source-Plugin für Capacitor, das deine App mit dem nativen Kalender des Geräts verbindet. Es ist auf npm als `@ebarooni/capacitor-calendar` veröffentlicht.',
      },
      {
        id: 'install',
        question: 'Wie installiere ich es?',
        answer:
          'Führe `npm install @ebarooni/capacitor-calendar` aus, danach `npx cap sync`. Im README steht, welcher npm-Tag zu deiner Capacitor-Version passt.',
      },
      {
        id: 'platforms',
        question: 'Welche Plattformen und Funktionen werden unterstützt?',
        answer:
          'Die Tabelle „Features and platforms“ im README ist immer aktuell. Sie zeigt jede Funktion für iOS, Android und das Web.',
      },
      {
        id: 'permissions',
        question: 'Welche Berechtigungen braucht meine App?',
        answer:
          'Der Abschnitt „Setup“ im README nennt die Info.plist-Schlüssel für iOS und die Berechtigungen für Android. Trage nur die ein, die deine App nutzt.',
      },
      {
        id: 'docs',
        question: 'Wo finde ich die API-Referenz?',
        answer:
          'Auf der Dokumentationsseite und im Abschnitt „API“ des README. Beide werden aus den TypeScript-Definitionen des Plugins erzeugt.',
      },
      {
        id: 'frameworks',
        question: 'Funktioniert es mit Ionic, Angular, React oder Vue?',
        answer:
          'Ja. Es ist ein Capacitor-Plugin und funktioniert deshalb in jeder Capacitor-App, egal welches Framework die Oberfläche rendert.',
      },
      {
        id: 'support',
        question: 'Wo kann ich eine Frage stellen oder einen Fehler melden?',
        answer:
          'Eröffne ein Issue im GitHub-Repository. Der Changelog und die Datei mit den Breaking Changes zeigen, was sich in jedem Release geändert hat.',
      },
    ],
  },
  nl: {
    label: 'FAQ',
    title: 'Wat ontwikkelaars als eerste vragen.',
    lead: 'Korte antwoorden, en waar je de details vindt. De documentatie van de plug-in is altijd de actuele bron.',
    entries: [
      {
        id: 'what',
        question: 'Wat is Capacitor Calendar?',
        answer:
          'Een open source Capacitor-plug-in die je app verbindt met de native agenda van het apparaat. Hij staat op npm als `@ebarooni/capacitor-calendar`.',
      },
      {
        id: 'install',
        question: 'Hoe installeer ik hem?',
        answer:
          'Voer `npm install @ebarooni/capacitor-calendar` uit en daarna `npx cap sync`. In de README staat welke npm-tag bij jouw Capacitor-versie past.',
      },
      {
        id: 'platforms',
        question: 'Welke platforms en functies worden ondersteund?',
        answer:
          'De tabel “Features and platforms” in de README is altijd actueel. Die toont elke functie voor iOS, Android en het web.',
      },
      {
        id: 'permissions',
        question: 'Welke machtigingen heeft mijn app nodig?',
        answer:
          'De sectie “Setup” van de README noemt de Info.plist-sleutels voor iOS en de machtigingen voor Android. Voeg alleen toe wat je app gebruikt.',
      },
      {
        id: 'docs',
        question: 'Waar vind ik de API-referentie?',
        answer:
          'Op de documentatiesite en in de sectie “API” van de README. Beide worden gegenereerd uit de TypeScript-definities van de plug-in.',
      },
      {
        id: 'frameworks',
        question: 'Werkt het met Ionic, Angular, React of Vue?',
        answer:
          'Ja. Het is een Capacitor-plug-in, dus het werkt in elke Capacitor-app, welk framework de interface ook rendert.',
      },
      {
        id: 'support',
        question: 'Waar kan ik een vraag stellen of een bug melden?',
        answer:
          'Open een issue in de GitHub-repository. De changelog en het bestand met breaking changes laten zien wat er in elke release is veranderd.',
      },
    ],
  },
};

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
