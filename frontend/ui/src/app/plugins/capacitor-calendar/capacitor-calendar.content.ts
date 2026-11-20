/*
 * Facts about the plugin. They come from the README, package.json and the
 * native build files of @ebarooni/capacitor-calendar 8.11.0. Check them
 * against the plugin repository when you change this page.
 */

export const PACKAGE_NAME = '@ebarooni/capacitor-calendar';

export const PLUGIN_LINKS = {
  docs: 'https://ebarooni.github.io/capacitor-calendar/',
  github: 'https://github.com/ebarooni/capacitor-calendar',
  npm: 'https://www.npmjs.com/package/@ebarooni/capacitor-calendar',
  issues: 'https://github.com/ebarooni/capacitor-calendar/issues',
  changelog:
    'https://github.com/ebarooni/capacitor-calendar/blob/HEAD/CHANGELOG.md',
  mcp: 'https://github.com/ebarooni/capacitor-calendar/blob/HEAD/mcp/README.md',
  apiReference: 'https://github.com/ebarooni/capacitor-calendar#api',
} as const;

/** The anchor of one method in the README API reference on GitHub. */
export function methodReferenceUrl(method: string): string {
  return `${PLUGIN_LINKS.github}#${method.toLowerCase()}`;
}

/**
 * Ehsan's figure from November 2026. The live badges below the hero show
 * the current numbers. Raise this only from the npm statistics.
 */
export const MONTHLY_DOWNLOADS_LABEL = '288k+';

export type LiveBadge = Readonly<{
  label: string;
  image: string;
  href: string;
}>;

const SHIELDS = 'https://img.shields.io';

export const LIVE_BADGES: readonly LiveBadge[] = [
  {
    label: 'Latest npm version',
    image: `${SHIELDS}/npm/v/${PACKAGE_NAME}?style=flat-square&label=npm`,
    href: PLUGIN_LINKS.npm,
  },
  {
    label: 'npm downloads per month',
    image: `${SHIELDS}/npm/dm/${PACKAGE_NAME}?style=flat-square`,
    href: PLUGIN_LINKS.npm,
  },
  {
    label: 'GitHub stars',
    image: `${SHIELDS}/github/stars/ebarooni/capacitor-calendar?style=flat-square&logo=github`,
    href: PLUGIN_LINKS.github,
  },
  {
    label: 'License',
    image: `${SHIELDS}/npm/l/${PACKAGE_NAME}?style=flat-square`,
    href: PLUGIN_LINKS.npm,
  },
];

export type PackageManager = Readonly<{
  id: string;
  name: string;
  command: string;
}>;

export const PACKAGE_MANAGERS: readonly PackageManager[] = [
  {
    id: 'npm',
    name: 'npm',
    command: `npm install ${PACKAGE_NAME}\nnpx cap sync`,
  },
  {
    id: 'pnpm',
    name: 'pnpm',
    command: `pnpm add ${PACKAGE_NAME}\nnpx cap sync`,
  },
  {
    id: 'yarn',
    name: 'Yarn',
    command: `yarn add ${PACKAGE_NAME}\nnpx cap sync`,
  },
];

/** Shown in the hero. The first line of the npm command only. */
export const HERO_INSTALL_COMMAND = `npm i ${PACKAGE_NAME}`;

export type Support = 'yes' | 'no' | 'partial';

export type CapabilityRow = Readonly<{
  capability: string;
  ios: Support;
  android: Support;
  web: Support;
}>;

/** The "Features and Platforms" table of the README. */
export const CAPABILITIES: readonly CapabilityRow[] = [
  {
    capability: 'Create, update and delete events',
    ios: 'yes',
    android: 'yes',
    web: 'partial',
  },
  {
    capability: 'Native prompts to create, edit and delete events',
    ios: 'yes',
    android: 'yes',
    web: 'partial',
  },
  {
    capability: 'List events in a date range',
    ios: 'yes',
    android: 'yes',
    web: 'no',
  },
  {
    capability: 'Request calendar permissions',
    ios: 'yes',
    android: 'yes',
    web: 'no',
  },
  {
    capability: 'List, create, modify and delete calendars',
    ios: 'yes',
    android: 'yes',
    web: 'no',
  },
  {
    capability: 'Open the native Calendar app',
    ios: 'yes',
    android: 'yes',
    web: 'no',
  },
  {
    capability: 'Calendar sources and a calendar picker prompt',
    ios: 'yes',
    android: 'no',
    web: 'no',
  },
  {
    capability: 'Reminders and reminder lists',
    ios: 'yes',
    android: 'no',
    web: 'no',
  },
];

export type CompatibilityRow = Readonly<{
  capacitor: string;
  tag: string;
  install: string;
}>;

/** "Match the npm tag to your Capacitor major." (README) */
export const COMPATIBILITY: readonly CompatibilityRow[] = [
  {
    capacitor: 'Capacitor 8',
    tag: 'latest',
    install: `npm install ${PACKAGE_NAME}`,
  },
  {
    capacitor: 'Capacitor 7',
    tag: 'latest-7',
    install: `npm install ${PACKAGE_NAME}@latest-7`,
  },
];

export type Requirement = Readonly<{
  label: string;
  value: string;
}>;

/** From EbarooniCapacitorCalendar.podspec, Package.swift and android/build.gradle. */
export const REQUIREMENTS: readonly Requirement[] = [
  { label: 'iOS', value: '15.0 or later' },
  { label: 'Android', value: 'API level 24 (Android 7.0) or later' },
  { label: 'iOS packaging', value: 'Swift Package Manager or CocoaPods' },
  { label: 'License', value: 'MIT' },
];
