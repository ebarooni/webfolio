import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';

import { BLOG_POSTS } from './blog/post-catalog';
import { DEFAULT_LANGUAGE, languages } from './config/languages';
import { Route } from './config/route';

/**
 * Every public page is prerendered in every language, so search engines
 * and link previews get the full text and the head tags without
 * JavaScript. The stored theme comes from a script in index.html, and the
 * navbar and the footer render again in the browser (ngSkipHydration).
 *
 * The backend answers an address without a prerendered page with status
 * 404 (see FallbackResource). A new page therefore needs its path here.
 */
const PAGES: readonly string[] = [
  Route.HOME,
  Route.PROJECTS,
  Route.BLOG,
  Route.CONTACT,
  Route.BUILD_INFO,
  Route.APPS_BOOKMARK_STATUS,
  Route.PLUGINS_CAPACITOR_CALENDAR,
];

function inLanguage(path: string, language: string): string {
  if (language === DEFAULT_LANGUAGE) {
    return path;
  }

  return path === '' ? language : `${language}/${path}`;
}

export const serverRoutes: ServerRoute[] = [
  ...languages.flatMap((language): ServerRoute[] => [
    ...PAGES.map((page): ServerRoute => ({
      path: inLanguage(page, language),
      renderMode: RenderMode.Prerender,
    })),
    {
      path: inLanguage(`${Route.BLOG}/:slug`, language),
      renderMode: RenderMode.Prerender,
      fallback: PrerenderFallback.None,
      getPrerenderParams: () =>
        Promise.resolve(BLOG_POSTS.map((post) => ({ slug: post.slug }))),
    },
  ]),
  {
    // The access denied page and unknown addresses stay client-rendered.
    path: '**',
    renderMode: RenderMode.Client,
  },
];
