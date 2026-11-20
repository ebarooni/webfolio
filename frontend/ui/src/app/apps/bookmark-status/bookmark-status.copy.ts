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
