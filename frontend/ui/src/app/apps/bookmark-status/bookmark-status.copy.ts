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

export function copyPartCode(
  part: string | { readonly code: string },
): string | null {
  if (typeof part === 'string') {
    return null;
  }

  return part.code;
}

const requirementItems = [
  'macOS Ventura 13 or later',
  'Safari 16.4 or later',
] as const;

export const bookmarkStatusCopy = {
  appStoreUrl: APP_STORE_URL,
  storeHref: storeLinkHref(APP_STORE_URL),
  secondaryHref: SECONDARY_CALL_TO_ACTION_URL,
  howFragment: HOW_IT_WORKS_FRAGMENT,
  price: PRICE,
  requirements: requirementItems,
  legal:
    'Apple, the Apple logo, Mac, macOS, and Safari are trademarks of Apple Inc., registered in the U.S. and other countries. Mac App Store is a service mark of Apple Inc. Bookmark Status is an independent app and is not affiliated with Apple.',
  hero: {
    iconAlt: 'Bookmark Status app icon',
    eyebrow: 'Safari extension for Mac',
    titleLine1: 'Already bookmarked?',
    titleLine2: 'Now you’ll know.',
    tagline:
      'Bookmark Status adds one quiet button to Safari’s toolbar. It turns blue when the page you’re on is already saved. Click it to see exactly where.',
    badgeLabel: 'Download Bookmark Status on the Mac App Store',
    secondaryLabel: 'See how it works',
    shotAlt:
      'The Bookmark Status tree page in Safari. Favorites › Recipes is open and Classic Banana Bread Recipe is highlighted with a This page tag.',
    toolbarAlt:
      'Safari toolbar with the blue Bookmark Status button and the tooltip Saved in Favorites › Recipes, Click to show in your bookmarks.',
    pillTitle: 'Read-only',
    pillBody: 'Never changes your bookmarks',
    trustLabel: 'Highlights',
    trust: [
      {
        title: 'Read-only by design.',
        body: 'Never writes to your bookmarks',
      },
      {
        title: 'No network access.',
        body: 'Nothing is sent anywhere',
      },
      {
        title: 'No account, no tracking.',
        body: 'No sign-up and no analytics',
      },
    ],
  },
  features: {
    eyebrow: 'Features',
    titleLead: 'One small button.',
    titleTail: 'Your whole bookmark library.',
    lead: 'A Safari extension and a lightweight Mac app that read the bookmarks Safari already keeps.',
    toolbar: {
      kicker: 'At a glance',
      title: 'Saved? The toolbar already knows.',
      body: 'The button turns blue when the page you’re on is in your bookmarks. Hover to see which folder it’s in. Not saved yet? It tells you how many pages from the same site you already have.',
      legendLabel: 'Toolbar button states',
      legend: ['Not saved', 'Saved', 'Needs access'],
      savedAlt:
        'Tooltip: Saved in Favorites › Recipes. Click to show in your bookmarks.',
      siteAlt:
        'Tooltip: Not saved · 3 pages from nytimes.com are saved. Click to see them.',
    },
    search: {
      kicker: 'Search',
      title: 'Search that speaks URL.',
      body: 'Find any bookmark by title or address, with its folder path on every result. Scope to Favorites or Bookmarks Menu, or narrow it down with:',
      tokens: ['site:nytimes.com', 'host:cooking.nytimes.com'],
      alt: 'Bookmark search for site:nytimes.com with All, Favorites and Bookmarks Menu scope chips and three results with folder paths.',
    },
    tree: {
      kicker: 'Bookmark tree',
      title: 'Every bookmark, one click away.',
      beforeKeys: 'Click the button or press ',
      keysLabel: 'Option Shift B',
      keys: ['⌥', '⇧', 'B'],
      afterKeys:
        ' to open a clean, read-only view of all your bookmarks. The page you’re on is marked, and edits you make in Safari show up automatically.',
      path: 'Favorites › Recipes',
      live: 'Updates automatically',
      currentTag: 'This page',
      rows: [
        {
          letter: 'C',
          name: 'Classic Banana Bread',
          domain: 'seriouseats.com',
          tile: 'blue',
          current: true,
        },
        {
          letter: 'T',
          name: 'Chocolate Chip Cookies',
          domain: 'seriouseats.com',
          tile: 'blue',
          current: false,
        },
        {
          letter: 'S',
          name: 'Sourdough Starter',
          domain: 'kingarthurbaking.com',
          tile: 'green',
          current: false,
        },
      ],
    },
    duplicates: {
      kicker: 'Insights',
      title: 'Spot pages you saved twice.',
      lead: 'Insights › Duplicates',
      body: ' lists every page saved in more than one place, with each folder it’s in. Tidy up in Safari’s bookmarks editor.',
      alt: 'The Bookmark Status app showing Insights › Duplicates: pages saved more than once, each with the folders it’s saved in.',
    },
    tabs: {
      kicker: 'Open in tabs',
      title: 'Open a whole folder at once.',
      body: 'Send every bookmark in a folder to new Safari tabs, from the tree or the app. More than 10? It checks with you first.',
      alt: 'Confirmation dialog: Open 24 bookmarks in new tabs? They’ll open as new tabs in Safari. Buttons: Cancel, Open 24 Tabs.',
    },
    app: {
      kicker: 'Mac app',
      title: 'A companion app that stays out of the way.',
      body: 'Browse and search all your bookmarks in a native sidebar. Close the window and Bookmark Status keeps working in the background, one click away in the menu bar.',
      checks: [
        ['Folder outline with bookmark counts'],
        [
          'Sidebar search with the same ',
          { code: 'site:' },
          ' and ',
          { code: 'host:' },
          ' filters',
        ],
        ['Menu bar status, plus Open Bookmark Tree'],
      ],
      alt: 'The Bookmark Status app sidebar with Safari Bookmarks folders, counts and a context menu item Open 12 in New Tabs.',
      menuLabel:
        'Menu bar menu: Ready · 68 bookmarks, Open Bookmark Status, Open Bookmark Tree, Quit Bookmark Status',
      clock: 'Tue 9:41',
      status: 'Ready · 68 bookmarks',
      openApp: 'Open Bookmark Status',
      openTree: 'Open Bookmark Tree',
      quit: 'Quit Bookmark Status',
      quitShortcut: '⌘Q',
    },
  },
  how: {
    eyebrow: 'How it works',
    titleLead: 'Set it up once.',
    titleTail: 'Then just browse.',
    steps: [
      {
        title: 'Choose Safari’s bookmarks file',
        body: 'macOS asks you to pick it once. The app and the extension share that access from then on.',
      },
      {
        title: 'Turn on the extension',
        body: 'Turn on Bookmark Status and allow it on all websites, so the toolbar button can see which page you’re on.',
      },
      {
        title: 'Browse as usual',
        body: 'The button updates as you switch tabs. Close the app window anytime. It keeps working in the background.',
      },
    ],
    fileHintBefore: 'In the file panel, press ',
    fileKeysLabel: 'Shift Command G',
    fileKeys: ['⇧', '⌘', 'G'],
    fileHintAfter: ' and paste ',
    filePath: '~/Library/Safari/Bookmarks.plist',
    crumb: 'Safari Settings › Extensions › Bookmark Status › All Websites: ',
    crumbStrong: 'Allow',
    notSaved: 'Not saved',
    saved: 'Saved',
  },
  privacy: {
    title: 'Your bookmarks never leave your Mac.',
    lead: 'Bookmark Status works entirely on this Mac. No account, no cloud, nothing sent to anyone.',
    points: [
      {
        title: 'Read-only, always',
        body: 'It reads Safari’s bookmarks file and never writes to it. macOS only gives it read access.',
      },
      {
        title: 'No network, no analytics',
        body: 'No servers, trackers or analytics. Nothing in the app or the extension sends your data anywhere.',
      },
      {
        title: 'Only the page address',
        body: 'The extension compares the current tab’s address with your bookmarks. It never reads page content.',
      },
      {
        title: 'Stored on this Mac',
        body: 'For speed, the extension keeps a list of your bookmark URLs in its local storage. It isn’t encrypted, and it never leaves this Mac.',
      },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered.',
    addBefore:
      'So Bookmark Status only reads Safari’s bookmarks file and never writes to it. To add or tidy bookmarks, use Safari’s own Add Bookmark (',
    addBetween: ') and bookmarks editor (',
    addAfter: ').',
    addKeysLabel: 'Command D',
    addKeys: ['⌘', 'D'],
    editorKeysLabel: 'Option Command B',
    editorKeys: ['⌥', '⌘', 'B'],
    matchBefore:
      'Matching is exact: a different path or query counts as a different page. The part after ',
    matchAfter:
      ' and one trailing slash are ignored. Only web (http and https) bookmarks count; Reading List and History don’t. When the exact page isn’t saved, the tooltip tells you how many pages from that site are, and one click shows them.',
    items: [
      {
        question: 'Can Bookmark Status add or remove bookmarks?',
        open: true,
        kind: 'add',
        paragraphs: [
          'No, and that’s on purpose. Apple’s Mac App Store rules (App Review Guideline 2.4.5) only let apps change another app’s data, like bookmarks, through macOS APIs made for it. Safari doesn’t offer one for bookmarks.',
        ],
      },
      {
        question: 'What do I need to use it?',
        open: false,
        kind: 'plain',
        paragraphs: [
          'A Mac with macOS Ventura 13 or later and Safari 16.4 or later. During setup you pick Safari’s bookmarks file once and turn on the extension with All Websites set to Allow.',
        ],
      },
      {
        question: 'Why does it need access to all websites?',
        open: false,
        kind: 'plain',
        paragraphs: [
          'So the toolbar button can see the address of the page you’re on and check it against your bookmarks. It doesn’t add scripts to websites or read what’s on the page.',
        ],
      },
      {
        question:
          'Why does a page show “Not saved” when I bookmarked a similar link?',
        open: false,
        kind: 'match',
        paragraphs: [],
      },
      {
        question: 'Does it work with Safari profiles?',
        open: false,
        kind: 'plain',
        paragraphs: [
          'Bookmark Status follows one bookmarks file at a time and uses it in every Safari profile. To follow another profile’s bookmarks, choose that profile’s bookmarks file instead with Choose a Different File… in the app.',
        ],
      },
      {
        question: 'What happens when I close the window?',
        open: false,
        kind: 'plain',
        paragraphs: [
          'The app leaves the Dock but keeps running, so the toolbar button keeps working. Use the bookmark icon in the menu bar to reopen the window, open the bookmark tree, or quit.',
        ],
      },
      {
        question: 'How much does it cost?',
        open: false,
        kind: 'plain',
        paragraphs: [
          'PRICE_TBD. Pricing will be confirmed on the Mac App Store at launch.',
        ],
      },
    ],
  },
  finalCta: {
    title: 'Know what you’ve saved.',
    lead: 'One glance at the toolbar, and you’ll know whether you already saved this page.',
    label: 'Get it on the Mac App Store',
  },
} as const;
