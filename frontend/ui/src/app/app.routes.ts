import { Routes } from '@angular/router';

import {
  accessDeniedGuard,
  geoAccessGuard,
} from './access-denied/geo-access-guard';
import { bookmarkStatusSeo } from './apps/bookmark-status/bookmark-status.seo';
import { postExistsGuard } from './blog/post/post-exists-guard';
import { DEFAULT_LANGUAGE, Language, languages } from './config/languages';
import { Route } from './config/route';
import { activatePreferredLanguage } from './localization/preferred-language';
import {
  activateLanguage,
  LANGUAGE_DATA_KEY,
} from './localization/site-language';
import { capacitorCalendarSeo } from './plugins/capacitor-calendar/capacitor-calendar.seo';
import { RouteSeo, SEO_DATA_KEY } from './shared/seo/route-seo';

// Titles that start with "pageTitles." are translation keys.
// LocalizedTitleStrategy translates them. It also writes the head tags
// for search engines from the "seo" data of the route.

function seo(routeSeo: RouteSeo): Readonly<Record<string, RouteSeo>> {
  return { [SEO_DATA_KEY]: routeSeo };
}

// Each call gives new route objects, because every language has its own.
function pageRoutes(): Routes {
  return [
    {
      path: Route.HOME,
      loadComponent: () => import('./home/home').then((m) => m.Home),
      title: 'pageTitles.home',
      data: {
        page: Route.HOME,
        ...seo({ kind: 'page', key: 'home' }),
      },
    },
    {
      path: Route.BLOG,
      loadComponent: () => import('./blog/blog').then((m) => m.BlogComponent),
      title: 'pageTitles.blog',
      data: {
        page: Route.BLOG,
        ...seo({ kind: 'page', key: 'blog' }),
      },
    },
    {
      path: `${Route.BLOG}/:slug`,
      canActivate: [postExistsGuard],
      loadComponent: () => import('./blog/post/post').then((m) => m.BlogPost),
      title: 'pageTitles.post',
      data: {
        page: Route.BLOG,
        ...seo({ kind: 'post' }),
      },
    },
    {
      path: Route.PROJECTS,
      loadComponent: () =>
        import('./projects/projects').then((m) => m.Projects),
      title: 'pageTitles.projects',
      data: {
        page: Route.PROJECTS,
        ...seo({ kind: 'page', key: 'projects' }),
      },
    },
    {
      path: Route.CONTACT,
      loadComponent: () => import('./contact/contact').then((m) => m.Contact),
      title: 'pageTitles.contact',
      data: {
        page: Route.CONTACT,
        ...seo({ kind: 'page', key: 'contact' }),
      },
    },
    {
      path: Route.BUILD_INFO,
      loadComponent: () =>
        import('./build-info/build-info').then((m) => m.BuildInfo),
      title: 'pageTitles.buildInfo',
      data: {
        page: Route.BUILD_INFO,
        ...seo({ kind: 'page', key: 'buildInfo', noIndex: true }),
      },
    },
    {
      path: Route.PRIVACY,
      loadComponent: () => import('./privacy/privacy').then((m) => m.Privacy),
      title: 'pageTitles.privacy',
      data: {
        page: Route.PRIVACY,
        ...seo({ kind: 'page', key: 'privacy' }),
      },
    },
    {
      path: Route.APPS_BOOKMARK_STATUS,
      loadComponent: () =>
        import('./apps/bookmark-status/bookmark-status').then(
          (m) => m.BookmarkStatusPage,
        ),
      title: 'pageTitles.bookmarkStatus',
      data: {
        page: Route.APPS_BOOKMARK_STATUS,
        ...seo({ kind: 'landing', seo: bookmarkStatusSeo }),
      },
    },
    {
      path: Route.PLUGINS_CAPACITOR_CALENDAR,
      loadComponent: () =>
        import('./plugins/capacitor-calendar/capacitor-calendar').then(
          (m) => m.CapacitorCalendarPage,
        ),
      title: 'pageTitles.capacitorCalendar',
      data: {
        page: Route.PLUGINS_CAPACITOR_CALENDAR,
        ...seo({ kind: 'landing', seo: capacitorCalendarSeo }),
      },
    },
    {
      path: Route.NOT_FOUND,
      loadComponent: () =>
        import('./not-found/not-found').then((m) => m.NotFound),
      title: 'pageTitles.notFound',
      data: {
        page: Route.NOT_FOUND,
        ...seo({ kind: 'hidden' }),
      },
    },
  ];
}

// The prefixed languages come first. Else the English "**" route would
// catch "/de/..." as an unknown page.
function languageRoutes(): Routes {
  const prefixed = languages.filter(
    (language) => language !== DEFAULT_LANGUAGE,
  );

  return [...prefixed, DEFAULT_LANGUAGE].map((language: Language) => ({
    path: language === DEFAULT_LANGUAGE ? '' : language,
    canActivate: [activateLanguage(language)],
    data: { [LANGUAGE_DATA_KEY]: language },
    children: pageRoutes(),
  }));
}

export const routes: Routes = [
  {
    path: Route.ACCESS_DENIED,
    canActivate: [accessDeniedGuard, activatePreferredLanguage],
    loadComponent: () =>
      import('./access-denied/access-denied').then((m) => m.AccessDenied),
    title: 'pageTitles.accessDenied',
    data: {
      page: Route.ACCESS_DENIED,
      ...seo({ kind: 'hidden' }),
    },
  },
  {
    // One shell for all languages, so the navbar stays on the screen when
    // the language changes.
    path: '',
    canActivate: [geoAccessGuard],
    canActivateChild: [geoAccessGuard],
    loadComponent: () =>
      import('./app-shell/app-shell').then((m) => m.AppShell),
    children: languageRoutes(),
  },
];
