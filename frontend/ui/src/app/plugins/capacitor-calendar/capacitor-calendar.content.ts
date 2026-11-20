/*
 * This page holds no plugin facts that change with a release: no versions,
 * no method lists, no platform tables and no download numbers. It only has
 * the package name, the install command and links. The plugin repository,
 * the docs and npm stay the single source of truth.
 */

export const PACKAGE_NAME = '@ebarooni/capacitor-calendar';

const GITHUB = 'https://github.com/ebarooni/capacitor-calendar';

export const PLUGIN_LINKS = {
  docs: 'https://ebarooni.github.io/capacitor-calendar/',
  github: GITHUB,
  npm: 'https://www.npmjs.com/package/@ebarooni/capacitor-calendar',
  issues: `${GITHUB}/issues`,
} as const;

export type LiveBadge = Readonly<{
  label: string;
  image: string;
  href: string;
}>;

const SHIELDS = 'https://img.shields.io';

/** Live numbers, loaded from npm and GitHub on each visit. */
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

export const HERO_INSTALL_COMMAND = `npm i ${PACKAGE_NAME}`;

export type Resource = Readonly<{
  id: string;
  title: string;
  body: string;
  href: string;
  source: string;
}>;

/*
 * Where each topic lives. The README anchors are its section headings.
 * If a heading changes in the README, change its anchor here.
 */
export const RESOURCES: readonly Resource[] = [
  {
    id: 'docs',
    title: 'Documentation',
    body: 'Guides, examples and the full API reference.',
    href: PLUGIN_LINKS.docs,
    source: 'Docs site',
  },
  {
    id: 'platforms',
    title: 'Features and platforms',
    body: 'What the plugin does on iOS, Android and the web.',
    href: `${GITHUB}#features-and-platforms`,
    source: 'README',
  },
  {
    id: 'compatibility',
    title: 'Capacitor compatibility',
    body: 'Which npm tag to install for your Capacitor version.',
    href: `${GITHUB}#capacitor-compatibility`,
    source: 'README',
  },
  {
    id: 'setup',
    title: 'Setup and permissions',
    body: 'The Info.plist keys and Android permissions to add.',
    href: `${GITHUB}#setup`,
    source: 'README',
  },
  {
    id: 'examples',
    title: 'Usage examples',
    body: 'Copy-ready code for the common calendar tasks.',
    href: `${GITHUB}#usage-examples`,
    source: 'README',
  },
  {
    id: 'api',
    title: 'API reference',
    body: 'Every method with its options, results and platforms.',
    href: `${GITHUB}#api`,
    source: 'README',
  },
  {
    id: 'changelog',
    title: 'Changelog',
    body: 'What changed in each release.',
    href: `${GITHUB}/blob/HEAD/CHANGELOG.md`,
    source: 'GitHub',
  },
  {
    id: 'breaking',
    title: 'Breaking changes',
    body: 'Migration steps between major versions.',
    href: `${GITHUB}/blob/HEAD/BREAKING.md`,
    source: 'GitHub',
  },
  {
    id: 'issues',
    title: 'Questions and bugs',
    body: 'Open an issue or read the existing answers.',
    href: PLUGIN_LINKS.issues,
    source: 'GitHub',
  },
];
