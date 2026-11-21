import { CopyShape, LocalizedCopy } from '../../../localization/localized-copy';

const en = {
  breadcrumbLabel: 'Breadcrumb',
  work: 'Work',
  eyebrow: 'Open source Capacitor plugin',
  titleLead: 'Native calendar events for',
  titleAccent: 'Capacitor apps.',
  lead: 'Capacitor Calendar connects your app to the native calendar of the device. One open source plugin, one import, and the calendar the user already knows.',
  getStarted: 'Get started',
  docs: 'Documentation',
  githubLabel: 'Capacitor Calendar on GitHub',
  npmLabel: 'Capacitor Calendar on npm',
  badgesLabel: 'Live package statistics',
  badges: {
    version: 'Latest npm version',
    downloads: 'npm downloads per month',
    stars: 'GitHub stars',
    license: 'License',
  },
} as const;

type HeroCopy = CopyShape<typeof en>;

export const HERO_COPY: LocalizedCopy<HeroCopy> = {
  en,
  de: {
    breadcrumbLabel: 'Brotkrümelnavigation',
    work: 'Projekte',
    eyebrow: 'Open-Source-Plugin für Capacitor',
    titleLead: 'Native Kalendertermine für',
    titleAccent: 'Capacitor-Apps.',
    lead: 'Capacitor Calendar verbindet deine App mit dem nativen Kalender des Geräts. Ein Open-Source-Plugin, ein Import und der Kalender, den die Nutzer schon kennen.',
    getStarted: 'Loslegen',
    docs: 'Dokumentation',
    githubLabel: 'Capacitor Calendar auf GitHub',
    npmLabel: 'Capacitor Calendar auf npm',
    badgesLabel: 'Live-Statistiken des Pakets',
    badges: {
      version: 'Neueste npm-Version',
      downloads: 'npm-Downloads pro Monat',
      stars: 'GitHub-Sterne',
      license: 'Lizenz',
    },
  },
  nl: {
    breadcrumbLabel: 'Kruimelpad',
    work: 'Projecten',
    eyebrow: 'Open source Capacitor-plug-in',
    titleLead: 'Native agenda-afspraken voor',
    titleAccent: 'Capacitor-apps.',
    lead: 'Capacitor Calendar verbindt je app met de native agenda van het apparaat. Eén open source plug-in, één import en de agenda die de gebruiker al kent.',
    getStarted: 'Aan de slag',
    docs: 'Documentatie',
    githubLabel: 'Capacitor Calendar op GitHub',
    npmLabel: 'Capacitor Calendar op npm',
    badgesLabel: 'Live pakketstatistieken',
    badges: {
      version: 'Nieuwste npm-versie',
      downloads: 'npm-downloads per maand',
      stars: 'GitHub-sterren',
      license: 'Licentie',
    },
  },
};
