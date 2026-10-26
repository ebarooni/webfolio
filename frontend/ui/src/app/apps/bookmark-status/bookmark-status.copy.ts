/**
 * HTML-mockup captures live under public/apps/safari-bookmark-status/shots.
 * Replace those files with real Mac screenshots that keep the same names.
 */
export const BOOKMARK_STATUS_ASSET_BASE = '/apps/safari-bookmark-status';

/** Placeholder until the Mac App Store listing exists. Do not guess a URL. */
export const APP_STORE_URL = 'APP_STORE_URL';

/** Optional later override. Null scrolls to the how-it-works section on this page. */
export const SECONDARY_CALL_TO_ACTION_URL: string | null = null;

/** Fragment for the how-it-works section. Matches the section id. */
export const HOW_IT_WORKS_FRAGMENT = 'how';

/** Hidden in the hero until a real price exists. Never render this while null. */
export const PRICE: string | null = null;

export const BOOKMARK_STATUS_ASSETS = {
  appIcon: `${BOOKMARK_STATUS_ASSET_BASE}/brand/app-icon-256.webp`,
  badgeBlack: `${BOOKMARK_STATUS_ASSET_BASE}/download-on-the-mac-app-store-black-en-us.svg`,
  badgeWhite: `${BOOKMARK_STATUS_ASSET_BASE}/download-on-the-mac-app-store-white-en-us.svg`,
  toolbarGrey: `${BOOKMARK_STATUS_ASSET_BASE}/brand/toolbar-grey-32.png`,
  toolbarBlue: `${BOOKMARK_STATUS_ASSET_BASE}/brand/toolbar-blue-32.png`,
  toolbarRed: `${BOOKMARK_STATUS_ASSET_BASE}/brand/toolbar-red-32.png`,
} as const;

export const PAGE_TITLE = 'Bookmark Status for Safari on Mac | Ehsan Barooni';

export const PAGE_CANONICAL = 'https://barooni.dev/apps/safari-bookmark-status';

export type PageMetaTag = Readonly<{
  attr: 'name' | 'property';
  key: string;
  content: string;
}>;

export const PAGE_META: readonly PageMetaTag[] = [
  {
    attr: 'name',
    key: 'description',
    content:
      'See at a glance whether the page you’re on is already in your Safari bookmarks, and where. Read-only, private, and entirely on your Mac.',
  },
  { attr: 'property', key: 'og:type', content: 'website' },
  { attr: 'property', key: 'og:site_name', content: 'Ehsan Barooni' },
  {
    attr: 'property',
    key: 'og:title',
    content: 'Bookmark Status: already bookmarked? Now you’ll know.',
  },
  {
    attr: 'property',
    key: 'og:description',
    content:
      'A Safari toolbar button that shows whether the current page is in your bookmarks, and where. Read-only and on-device.',
  },
  {
    attr: 'property',
    key: 'og:url',
    content: PAGE_CANONICAL,
  },
  {
    attr: 'property',
    key: 'og:image',
    content: 'https://barooni.dev/apps/safari-bookmark-status/og-image.png',
  },
  { attr: 'property', key: 'og:image:width', content: '1200' },
  { attr: 'property', key: 'og:image:height', content: '630' },
  {
    attr: 'property',
    key: 'og:image:alt',
    content:
      'Bookmark Status app icon next to a Safari bookmark tree with the current page highlighted',
  },
  { attr: 'name', key: 'twitter:card', content: 'summary_large_image' },
  {
    attr: 'name',
    key: 'twitter:title',
    content: 'Bookmark Status: already bookmarked? Now you’ll know.',
  },
  {
    attr: 'name',
    key: 'twitter:description',
    content:
      'A Safari toolbar button that shows whether the current page is in your bookmarks, and where. Read-only and on-device.',
  },
  {
    attr: 'name',
    key: 'twitter:image',
    content: 'https://barooni.dev/apps/safari-bookmark-status/og-image.png',
  },
  {
    attr: 'name',
    key: 'twitter:image:alt',
    content:
      'Bookmark Status app icon next to a Safari bookmark tree with the current page highlighted',
  },
];

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
  image: 'https://barooni.dev/apps/safari-bookmark-status/og-image.png',
  screenshot:
    'https://barooni.dev/apps/safari-bookmark-status/hero-tree-light@2x.png',
  author: {
    '@type': 'Person',
    name: 'Ehsan Barooni',
    url: 'https://barooni.dev',
  },
} as const;

export function isAppStoreUrlPlaceholder(url: string): boolean {
  return url === 'APP_STORE_URL';
}

export function storeLinkHref(url: string): string | null {
  if (isAppStoreUrlPlaceholder(url)) {
    return null;
  }

  return url;
}

export function blockPlaceholderAppStoreLink(event: Event): void {
  if (isAppStoreUrlPlaceholder(APP_STORE_URL)) {
    event.preventDefault();
  }
}

export function blockPlaceholderAppStoreKey(event: KeyboardEvent): void {
  if (!isAppStoreUrlPlaceholder(APP_STORE_URL)) {
    return;
  }

  if (event.key !== 'Enter' && event.key !== ' ') {
    return;
  }

  event.preventDefault();
}

export const REQUIREMENTS = [
  'macOS Ventura 13 or later',
  'Safari 16.4 or later',
] as const;

/** Store link, price, and requirements shared by the hero and the final call to action. */
export const bookmarkStatusLinks = {
  appStoreUrl: APP_STORE_URL,
  storeHref: storeLinkHref(APP_STORE_URL),
  secondaryHref: SECONDARY_CALL_TO_ACTION_URL,
  howFragment: HOW_IT_WORKS_FRAGMENT,
  price: PRICE,
  requirements: REQUIREMENTS,
} as const;

export const pageCopy = {
  legal:
    'Apple, the Apple logo, Mac, macOS, and Safari are trademarks of Apple Inc., registered in the U.S. and other countries. Mac App Store is a service mark of Apple Inc. Bookmark Status is an independent app and is not affiliated with Apple.',
} as const;
