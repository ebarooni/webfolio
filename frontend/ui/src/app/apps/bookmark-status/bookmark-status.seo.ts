import { SITE_URL } from '../../config/site';
import { type PageSeoConfig } from '../../shared/seo/page-seo';
import {
  APP_STORE_URL,
  BOOKMARK_STATUS_ASSET_BASE,
} from './bookmark-status.copy';

export const PAGE_TITLE = 'Bookmark Status for Safari on Mac | Ehsan Barooni';

export const PAGE_CANONICAL = `${SITE_URL}${BOOKMARK_STATUS_ASSET_BASE}`;

const IMAGE_URL = `${SITE_URL}${BOOKMARK_STATUS_ASSET_BASE}/og-image.png`;

export const PAGE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Bookmark Status',
  alternateName: 'Bookmark Status for Safari',
  description:
    'A Safari extension and Mac app that shows whether the current page is already in your Safari bookmarks, and where. Read-only and on-device.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'macOS 13.0 or later',
  softwareRequirements: 'Safari 16.4 or later',
  url: PAGE_CANONICAL,
  downloadUrl: APP_STORE_URL,
  image: IMAGE_URL,
  screenshot: `${SITE_URL}${BOOKMARK_STATUS_ASSET_BASE}/hero-tree-light@2x.png`,
  author: {
    '@type': 'Person',
    name: 'Ehsan Barooni',
    url: `${SITE_URL}/`,
  },
} as const;

/** The page is in English in every site language, see RouteSeo. */
export const PAGE_SEO: PageSeoConfig = {
  title: PAGE_TITLE,
  description:
    'See at a glance whether the page you’re on is already in your Safari bookmarks, and where. Read-only, private, and entirely on your Mac.',
  canonicalUrl: PAGE_CANONICAL,
  social: {
    title: 'Bookmark Status: already bookmarked? Now you’ll know.',
    description:
      'A Safari toolbar button that shows whether the current page is in your bookmarks, and where. Read-only and on-device.',
  },
  image: {
    url: IMAGE_URL,
    alt: 'Bookmark Status app icon next to a Safari bookmark tree with the current page highlighted',
    width: 1200,
    height: 630,
  },
  jsonLd: PAGE_JSON_LD,
};
