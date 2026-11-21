import { Language } from './languages';

/** The public address of the site, without a slash at the end. */
export const SITE_URL = 'https://barooni.dev';

export const SITE_NAME = 'Ehsan Barooni';

/** The Open Graph locale of each language. */
export const OPEN_GRAPH_LOCALES: Readonly<Record<Language, string>> = {
  de: 'de_DE',
  en: 'en_US',
  nl: 'nl_NL',
};

export const SITE_IMAGE = {
  url: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
} as const;
