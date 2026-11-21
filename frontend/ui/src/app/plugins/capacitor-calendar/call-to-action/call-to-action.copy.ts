import { CopyShape, LocalizedCopy } from '../../../localization/localized-copy';

const en = {
  titleLead: 'Add the native calendar to your app',
  titleAccent: 'today.',
  lead: 'Free and open source. Install it, sync the native projects, and follow the documentation to your first event.',
  docsTitle: 'Documentation',
  docsText: 'Guides, examples and the full API',
  githubText: 'Source, issues and a star if it helps you',
  npmText: 'Versions, tags and download numbers',
  author:
    'Built and maintained by Ehsan Barooni. Need a custom Capacitor plugin or help with a hybrid app?',
  contact: 'Get in touch',
} as const;

type CallToActionCopy = CopyShape<typeof en>;

export const CALL_TO_ACTION_COPY: LocalizedCopy<CallToActionCopy> = {
  en,
  de: {
    titleLead: 'Bring den nativen Kalender in deine App,',
    titleAccent: 'noch heute.',
    lead: 'Kostenlos und Open Source. Installieren, die nativen Projekte synchronisieren und mit der Dokumentation zum ersten Termin.',
    docsTitle: 'Dokumentation',
    docsText: 'Anleitungen, Beispiele und die vollständige API',
    githubText: 'Quellcode, Issues und ein Stern, wenn es dir hilft',
    npmText: 'Versionen, Tags und Downloadzahlen',
    author:
      'Entwickelt und gepflegt von Ehsan Barooni. Du brauchst ein eigenes Capacitor-Plugin oder Hilfe mit einer hybriden App?',
    contact: 'Schreib mir',
  },
  nl: {
    titleLead: 'Voeg de native agenda vandaag nog',
    titleAccent: 'toe aan je app.',
    lead: 'Gratis en open source. Installeer het, synchroniseer de native projecten en volg de documentatie naar je eerste afspraak.',
    docsTitle: 'Documentatie',
    docsText: 'Handleidingen, voorbeelden en de volledige API',
    githubText: 'Broncode, issues en een ster als het je helpt',
    npmText: 'Versies, tags en downloadcijfers',
    author:
      'Gebouwd en onderhouden door Ehsan Barooni. Een eigen Capacitor-plug-in nodig of hulp bij een hybride app?',
    contact: 'Neem contact op',
  },
};
