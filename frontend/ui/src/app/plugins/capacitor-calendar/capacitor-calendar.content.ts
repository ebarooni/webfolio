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

export type LiveBadgeId = 'version' | 'downloads' | 'stars' | 'license';

/** The label of each badge is in hero.copy.ts, in every site language. */
export type LiveBadge = Readonly<{
  id: LiveBadgeId;
  image: string;
  href: string;
}>;

const SHIELDS = 'https://img.shields.io';

/** Live numbers, loaded from npm and GitHub on each visit. */
export const LIVE_BADGES: readonly LiveBadge[] = [
  {
    id: 'version',
    image: `${SHIELDS}/npm/v/${PACKAGE_NAME}?style=flat-square&label=npm`,
    href: PLUGIN_LINKS.npm,
  },
  {
    id: 'downloads',
    image: `${SHIELDS}/npm/dm/${PACKAGE_NAME}?style=flat-square`,
    href: PLUGIN_LINKS.npm,
  },
  {
    id: 'stars',
    image: `${SHIELDS}/github/stars/ebarooni/capacitor-calendar?style=flat-square&logo=github`,
    href: PLUGIN_LINKS.github,
  },
  {
    id: 'license',
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

export type ResourceSource = 'docs' | 'readme' | 'github';

/** The title and the text of each resource are in resources.copy.ts. */
export type Resource = Readonly<{
  id: ResourceId;
  href: string;
  source: ResourceSource;
}>;

export type ResourceId =
  | 'docs'
  | 'platforms'
  | 'compatibility'
  | 'setup'
  | 'examples'
  | 'api'
  | 'changelog'
  | 'breaking'
  | 'issues';

/*
 * Where each topic lives. The README anchors are its section headings.
 * If a heading changes in the README, change its anchor here.
 */
export const RESOURCES: readonly Resource[] = [
  { id: 'docs', href: PLUGIN_LINKS.docs, source: 'docs' },
  {
    id: 'platforms',
    href: `${GITHUB}#features-and-platforms`,
    source: 'readme',
  },
  {
    id: 'compatibility',
    href: `${GITHUB}#capacitor-compatibility`,
    source: 'readme',
  },
  { id: 'setup', href: `${GITHUB}#setup`, source: 'readme' },
  { id: 'examples', href: `${GITHUB}#usage-examples`, source: 'readme' },
  { id: 'api', href: `${GITHUB}#api`, source: 'readme' },
  {
    id: 'changelog',
    href: `${GITHUB}/blob/HEAD/CHANGELOG.md`,
    source: 'github',
  },
  { id: 'breaking', href: `${GITHUB}/blob/HEAD/BREAKING.md`, source: 'github' },
  { id: 'issues', href: PLUGIN_LINKS.issues, source: 'github' },
];
