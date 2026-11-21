import { CopyShape, LocalizedCopy } from '../../../localization/localized-copy';

// A step text may hold one link. It is written as "before[link]after".
const en = {
  label: 'Quick start',
  title: 'Three steps to your first event.',
  lead: 'Install the package here. The permissions and the code live in the plugin documentation, so they always match the current release.',
  install: {
    title: 'Install the plugin',
    textBefore:
      'Add the package and sync the native projects. On an older Capacitor version, install the matching npm tag from the',
    link: 'compatibility table',
    textAfter: '.',
  },
  permissions: {
    title: 'Declare the permissions',
    text: 'The plugin uses the native calendar of the device. Add the usage descriptions on iOS and the calendar permissions on Android.',
    source: 'README · Setup',
    card: 'Info.plist keys and Android permissions',
  },
  api: {
    title: 'Call the API',
    textBefore: 'Import',
    textAfter: ', request access and create your first event.',
    examplesSource: 'README · Usage examples',
    examplesCard: 'Copy-ready code for events, calendars and more',
    docsSource: 'Documentation',
    docsCard: 'Guides and the full API reference',
  },
} as const;

type QuickStartCopy = CopyShape<typeof en>;

export const QUICK_START_COPY: LocalizedCopy<QuickStartCopy> = {
  en,
  de: {
    label: 'Schnellstart',
    title: 'In drei Schritten zum ersten Termin.',
    lead: 'Installiere das Paket hier. Die Berechtigungen und der Code stehen in der Plugin-Dokumentation, damit sie immer zum aktuellen Release passen.',
    install: {
      title: 'Plugin installieren',
      textBefore:
        'Füge das Paket hinzu und synchronisiere die nativen Projekte. Für eine ältere Capacitor-Version installierst du den passenden npm-Tag aus der',
      link: 'Kompatibilitätstabelle',
      textAfter: '.',
    },
    permissions: {
      title: 'Berechtigungen eintragen',
      text: 'Das Plugin nutzt den nativen Kalender des Geräts. Trage unter iOS die Nutzungsbeschreibungen und unter Android die Kalenderberechtigungen ein.',
      source: 'README · Setup',
      card: 'Info.plist-Schlüssel und Android-Berechtigungen',
    },
    api: {
      title: 'API aufrufen',
      textBefore: 'Importiere',
      textAfter: ', frage den Zugriff an und lege deinen ersten Termin an.',
      examplesSource: 'README · Usage examples',
      examplesCard: 'Fertiger Code für Termine, Kalender und mehr',
      docsSource: 'Dokumentation',
      docsCard: 'Anleitungen und die vollständige API-Referenz',
    },
  },
  nl: {
    label: 'Snel aan de slag',
    title: 'In drie stappen naar je eerste afspraak.',
    lead: 'Installeer het pakket hier. De machtigingen en de code staan in de documentatie van de plug-in, zodat ze altijd bij de huidige release passen.',
    install: {
      title: 'Installeer de plug-in',
      textBefore:
        'Voeg het pakket toe en synchroniseer de native projecten. Gebruik je een oudere Capacitor-versie, installeer dan de passende npm-tag uit de',
      link: 'compatibiliteitstabel',
      textAfter: '.',
    },
    permissions: {
      title: 'Geef de machtigingen op',
      text: 'De plug-in gebruikt de native agenda van het apparaat. Voeg op iOS de gebruiksbeschrijvingen toe en op Android de agendamachtigingen.',
      source: 'README · Setup',
      card: 'Info.plist-sleutels en Android-machtigingen',
    },
    api: {
      title: 'Roep de API aan',
      textBefore: 'Importeer',
      textAfter: ', vraag toegang en maak je eerste afspraak.',
      examplesSource: 'README · Usage examples',
      examplesCard: 'Kant-en-klare code voor afspraken, agenda’s en meer',
      docsSource: 'Documentatie',
      docsCard: 'Handleidingen en de volledige API-referentie',
    },
  },
};
