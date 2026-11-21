import { CopyShape, LocalizedCopy } from '../../../localization/localized-copy';

const en = {
  label: 'Documentation',
  title: 'Everything you need, at the source.',
  lead: 'Features, platform support, versions and the API change with the plugin. They live in one place, next to the code, and are always up to date there.',
  sources: { docs: 'Docs site', readme: 'README', github: 'GitHub' },
  resources: {
    docs: {
      title: 'Documentation',
      body: 'Guides, examples and the full API reference.',
    },
    platforms: {
      title: 'Features and platforms',
      body: 'What the plugin does on iOS, Android and the web.',
    },
    compatibility: {
      title: 'Capacitor compatibility',
      body: 'Which npm tag to install for your Capacitor version.',
    },
    setup: {
      title: 'Setup and permissions',
      body: 'The Info.plist keys and Android permissions to add.',
    },
    examples: {
      title: 'Usage examples',
      body: 'Copy-ready code for the common calendar tasks.',
    },
    api: {
      title: 'API reference',
      body: 'Every method with its options, results and platforms.',
    },
    changelog: { title: 'Changelog', body: 'What changed in each release.' },
    breaking: {
      title: 'Breaking changes',
      body: 'Migration steps between major versions.',
    },
    issues: {
      title: 'Questions and bugs',
      body: 'Open an issue or read the existing answers.',
    },
  },
} as const;

type ResourcesCopy = CopyShape<typeof en>;

export const RESOURCES_COPY: LocalizedCopy<ResourcesCopy> = {
  en,
  de: {
    label: 'Dokumentation',
    title: 'Alles, was du brauchst, direkt an der Quelle.',
    lead: 'Funktionen, Plattformen, Versionen und die API ändern sich mit dem Plugin. Sie stehen an einem Ort, direkt neben dem Code, und sind dort immer aktuell.',
    sources: { docs: 'Doku-Website', readme: 'README', github: 'GitHub' },
    resources: {
      docs: {
        title: 'Dokumentation',
        body: 'Anleitungen, Beispiele und die vollständige API-Referenz.',
      },
      platforms: {
        title: 'Funktionen und Plattformen',
        body: 'Was das Plugin auf iOS, Android und im Web kann.',
      },
      compatibility: {
        title: 'Capacitor-Kompatibilität',
        body: 'Welchen npm-Tag du für deine Capacitor-Version installierst.',
      },
      setup: {
        title: 'Einrichtung und Berechtigungen',
        body: 'Die Info.plist-Schlüssel und Android-Berechtigungen, die du brauchst.',
      },
      examples: {
        title: 'Anwendungsbeispiele',
        body: 'Fertiger Code für die üblichen Kalenderaufgaben.',
      },
      api: {
        title: 'API-Referenz',
        body: 'Jede Methode mit ihren Optionen, Ergebnissen und Plattformen.',
      },
      changelog: {
        title: 'Changelog',
        body: 'Was sich in jedem Release geändert hat.',
      },
      breaking: {
        title: 'Breaking Changes',
        body: 'Migrationsschritte zwischen Hauptversionen.',
      },
      issues: {
        title: 'Fragen und Fehler',
        body: 'Eröffne ein Issue oder lies die vorhandenen Antworten.',
      },
    },
  },
  nl: {
    label: 'Documentatie',
    title: 'Alles wat je nodig hebt, bij de bron.',
    lead: 'Functies, platformondersteuning, versies en de API veranderen met de plug-in. Ze staan op één plek, naast de code, en zijn daar altijd actueel.',
    sources: { docs: 'Docs-site', readme: 'README', github: 'GitHub' },
    resources: {
      docs: {
        title: 'Documentatie',
        body: 'Handleidingen, voorbeelden en de volledige API-referentie.',
      },
      platforms: {
        title: 'Functies en platforms',
        body: 'Wat de plug-in doet op iOS, Android en het web.',
      },
      compatibility: {
        title: 'Capacitor-compatibiliteit',
        body: 'Welke npm-tag je installeert voor jouw Capacitor-versie.',
      },
      setup: {
        title: 'Installatie en machtigingen',
        body: 'De Info.plist-sleutels en Android-machtigingen die je toevoegt.',
      },
      examples: {
        title: 'Voorbeelden',
        body: 'Kant-en-klare code voor de gangbare agendataken.',
      },
      api: {
        title: 'API-referentie',
        body: 'Elke methode met haar opties, resultaten en platforms.',
      },
      changelog: {
        title: 'Changelog',
        body: 'Wat er in elke release is veranderd.',
      },
      breaking: {
        title: 'Breaking changes',
        body: 'Migratiestappen tussen hoofdversies.',
      },
      issues: {
        title: 'Vragen en bugs',
        body: 'Open een issue of lees de bestaande antwoorden.',
      },
    },
  },
};
