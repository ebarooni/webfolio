import { type PageSeoConfig } from '../../shared/seo/page-seo';
import { PACKAGE_NAME, PLUGIN_LINKS } from './capacitor-calendar.content';
import { FAQ, plainAnswer } from './faq/faq.content';

const SITE_URL = 'https://barooni.dev';

export const PAGE_URL = `${SITE_URL}/plugins/capacitor-calendar`;

export const PAGE_TITLE =
  'Capacitor Calendar Plugin for iOS and Android | Ehsan Barooni';

export const PAGE_DESCRIPTION =
  'Native calendar events for Capacitor apps. Create, edit, list and delete events and calendars on iOS and Android, reminders on iOS, and .ics files on the web. MIT licensed.';

const IMAGE_URL = `${SITE_URL}/plugins/capacitor-calendar/og-image.png`;

const AUTHOR = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Ehsan Barooni',
  url: SITE_URL,
} as const;

export const PAGE_SEO: PageSeoConfig = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  canonicalUrl: PAGE_URL,
  image: {
    url: IMAGE_URL,
    alt: 'Capacitor Calendar: native calendar events for Capacitor apps on iOS, Android and the web',
    width: 1200,
    height: 630,
  },
  jsonLd: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        inLanguage: 'en',
        primaryImageOfPage: IMAGE_URL,
        about: { '@id': `${PAGE_URL}#software` },
        breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
        author: AUTHOR,
      },
      {
        '@type': 'SoftwareSourceCode',
        '@id': `${PAGE_URL}#software`,
        name: PACKAGE_NAME,
        alternateName: 'Capacitor Calendar',
        description:
          'A Capacitor plugin for native calendar events on iOS and Android, with reminders on iOS and .ics event creation on the web.',
        url: PAGE_URL,
        codeRepository: PLUGIN_LINKS.github,
        programmingLanguage: ['TypeScript', 'Swift', 'Kotlin'],
        runtimePlatform: ['Capacitor', 'iOS', 'Android', 'Web'],
        license: 'https://opensource.org/licenses/MIT',
        keywords:
          'capacitor, capacitor plugin, calendar, reminders, eventkit, ionic, ios, android',
        sameAs: [PLUGIN_LINKS.npm, PLUGIN_LINKS.docs],
        author: AUTHOR,
        maintainer: AUTHOR,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Work',
            item: `${SITE_URL}/projects`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Capacitor Calendar',
            item: PAGE_URL,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}#faq`,
        mainEntity: FAQ.map((entry) => ({
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
