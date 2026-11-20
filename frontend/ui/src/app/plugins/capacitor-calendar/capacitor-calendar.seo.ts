import { SITE_URL } from '../../config/site';
import { type PageSeoConfig } from '../../shared/seo/page-seo';
import { PACKAGE_NAME, PLUGIN_LINKS } from './capacitor-calendar.content';
import { FAQ, plainAnswer } from './faq/faq.content';

export const PAGE_URL = `${SITE_URL}/plugins/capacitor-calendar`;

export const PAGE_TITLE =
  'Capacitor Calendar Plugin for iOS and Android | Ehsan Barooni';

export const PAGE_DESCRIPTION =
  'Capacitor Calendar is an open source Capacitor plugin that connects your app to the native calendar. Install it from npm and find the docs, the API reference and the source code.';

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
    alt: 'Capacitor Calendar: native calendar events for Capacitor apps',
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
          'An open source Capacitor plugin that connects your app to the native calendar of the device.',
        url: PAGE_URL,
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
