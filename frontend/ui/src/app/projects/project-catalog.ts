import { Route } from '../config/route';

// The description of a project is translated text. Its key is the id.
export type CatalogProject = Readonly<{
  id: string;
  title: string;
  tags: readonly string[];
  href?: string;
  internalPath?: string;
}>;

const UNSORTED_PROJECTS: readonly CatalogProject[] = [
  {
    id: 'bookmark-status',
    title: 'Bookmark Status',
    internalPath: `/${Route.APPS_BOOKMARK_STATUS}`,
    tags: ['macOS', 'Safari', 'Read-only'],
  },
  {
    id: 'capacitor-calendar',
    title: 'Capacitor Calendar Plugin',
    internalPath: `/${Route.PLUGINS_CAPACITOR_CALENDAR}`,
    tags: ['Capacitor', 'iOS', 'Android'],
  },
  {
    id: 'webfolio',
    title: 'Webfolio',
    href: 'https://github.com/ebarooni/webfolio',
    tags: ['Angular', 'Tailwind CSS', 'Quarkus'],
  },
  {
    id: 'capawesome',
    title: 'Capawesome',
    href: 'https://github.com/capawesome-team',
    tags: ['Capacitor', 'Enterprise'],
  },
  {
    id: 'web-configs',
    title: 'Web Configs',
    href: 'https://github.com/ebarooni/dev-tools',
    tags: ['ESLint', 'Prettier', 'Stylelint'],
  },
  {
    id: 'repo-sync',
    title: 'Repo Sync',
    href: 'https://gist.github.com/ebarooni/c268a88bf8e09175b5017a176f46b31e',
    tags: ['GitHub', 'GitLab', 'CI/CD'],
  },
  {
    id: 'cloudcost-tracker',
    title: 'CloudCost Tracker',
    href: 'https://github.com/ebarooni',
    tags: ['Google Cloud', 'Pub/Sub'],
  },
  {
    id: 'spotify-auth',
    title: 'Spotify Auth Integration',
    href: 'https://github.com/ebarooni/spotify-web-api-playground',
    tags: ['Angular', 'Spotify API'],
  },
];

export const FEATURED_PROJECT_ID = 'bookmark-status';

export const PROJECTS: readonly CatalogProject[] = [...UNSORTED_PROJECTS].sort(
  (first, second) => first.title.localeCompare(second.title),
);

export function findProject(id: string): CatalogProject {
  const project = PROJECTS.find((candidate) => candidate.id === id);

  if (!project) {
    throw new Error(`The project catalog has no project "${id}".`);
  }

  return project;
}
