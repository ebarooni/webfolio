import { Language } from '../../config/languages';
import { SITE_URL } from '../../config/site';
import { localizedUrl } from '../../localization/localized-path';
import { type LandingSeo } from '../../shared/seo/route-seo';
import { PACKAGE_NAME, PLUGIN_LINKS } from './capacitor-calendar.content';
import { FAQ_COPY, plainAnswer } from './faq/faq.content';
import { HERO_COPY } from './hero/hero.copy';

const IMAGE_URL = `${SITE_URL}/plugins/capacitor-calendar/og-image.png`;

const AUTHOR = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Ehsan Barooni',
  url: SITE_URL,
} as const;

/** The page title is "pageTitles.capacitorCalendar" in the translations. */
const TEXTS: Readonly<
  Record<
    Language,
    Readonly<{
      description: string;
      imageAlt: string;
      software: string;
      home: string;
    }>
  >
> = {
  en: {
    description:
      'Capacitor Calendar is an open source Capacitor plugin that connects your app to the native calendar. Install it from npm and find the docs, the API reference and the source code.',
    imageAlt: 'Capacitor Calendar: native calendar events for Capacitor apps',
    software:
      'An open source Capacitor plugin that connects your app to the native calendar of the device.',
    home: 'Home',
  },
  de: {
    description:
      'Capacitor Calendar ist ein Open-Source-Plugin für Capacitor, das deine App mit dem nativen Kalender verbindet. Installiere es über npm und finde Doku, API-Referenz und Quellcode.',
    imageAlt: 'Capacitor Calendar: native Kalendertermine für Capacitor-Apps',
    software:
      'Ein Open-Source-Plugin für Capacitor, das deine App mit dem nativen Kalender des Geräts verbindet.',
    home: 'Startseite',
  },
  nl: {
    description:
      'Capacitor Calendar is een open source Capacitor-plug-in die je app verbindt met de native agenda. Installeer hem via npm en vind de documentatie, de API-referentie en de broncode.',
    imageAlt: 'Capacitor Calendar: native agenda-afspraken voor Capacitor-apps',
    software:
      'Een open source Capacitor-plug-in die je app verbindt met de native agenda van het apparaat.',
    home: 'Home',
  },
};

/** The head tags of the page in one language, see RouteSeo. */
export function capacitorCalendarSeo(
  language: Language,
  url: string,
  title: string,
): LandingSeo {
  const texts = TEXTS[language];

  return {
    description: texts.description,
    image: { url: IMAGE_URL, alt: texts.imageAlt, width: 1200, height: 630 },
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${url}#webpage`,
          url,
          name: title,
          description: texts.description,
          inLanguage: language,
          primaryImageOfPage: IMAGE_URL,
          about: { '@id': `${url}#software` },
          breadcrumb: { '@id': `${url}#breadcrumb` },
          author: AUTHOR,
        },
        {
          '@type': 'SoftwareSourceCode',
          '@id': `${url}#software`,
          name: PACKAGE_NAME,
          alternateName: 'Capacitor Calendar',
          description: texts.software,
          url,
          codeRepository: PLUGIN_LINKS.github,
          runtimePlatform: 'Capacitor',
          keywords:
            'capacitor, capacitor plugin, capacitor calendar, calendar, ionic',
          sameAs: [PLUGIN_LINKS.npm, PLUGIN_LINKS.docs],
          author: AUTHOR,
          maintainer: AUTHOR,
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${url}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: texts.home,
              item: localizedUrl('/', language),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: HERO_COPY[language].work,
              item: localizedUrl('/projects', language),
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Capacitor Calendar',
              item: url,
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': `${url}#faq`,
          inLanguage: language,
          mainEntity: FAQ_COPY[language].entries.map((entry) => ({
            '@type': 'Question',
            name: entry.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: plainAnswer(entry.answer),
            },
          })),
        },
      ],
    },
  };
}
