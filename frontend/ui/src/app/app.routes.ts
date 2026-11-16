import {
  accessDeniedGuard,
  geoAccessGuard,
} from './access-denied/geo-access-guard';
import { findPostBySlug } from './blog/post-catalog';
import { postExistsGuard } from './blog/post/post-exists-guard';
import { Route } from './config/route';
import { ResolveFn, Routes } from '@angular/router';

const postTitle: ResolveFn<string> = (route) => {
  const post = findPostBySlug(route.paramMap.get('slug') ?? '');

  return `${post?.title ?? 'Blog'} | Ehsan Barooni`;
};

export const routes: Routes = [
  {
    path: Route.ACCESS_DENIED,
    canActivate: [accessDeniedGuard],
    loadComponent: () =>
      import('./access-denied/access-denied').then((m) => m.AccessDenied),
    title: 'Access denied',
    data: {
      page: Route.ACCESS_DENIED,
    },
  },
  {
    path: '',
    canActivate: [geoAccessGuard],
    canActivateChild: [geoAccessGuard],
    loadComponent: () =>
      import('./app-shell/app-shell').then((m) => m.AppShell),
    children: [
      {
        path: Route.HOME,
        loadComponent: () => import('./home/home').then((m) => m.Home),
        title: 'Ehsan Barooni | Full-Stack Software Engineer',
        data: {
          page: Route.HOME,
        },
      },
      {
        path: Route.BLOG,
        loadComponent: () => import('./blog/blog').then((m) => m.BlogComponent),
        title: 'Blog | Ehsan Barooni',
        data: {
          page: Route.BLOG,
        },
      },
      {
        path: `${Route.BLOG}/:slug`,
        canActivate: [postExistsGuard],
        loadComponent: () => import('./blog/post/post').then((m) => m.BlogPost),
        title: postTitle,
        data: {
          page: Route.BLOG,
        },
      },
      {
        path: Route.PROJECTS,
        loadComponent: () =>
          import('./projects/projects').then((m) => m.Projects),
        title: 'Projects | Ehsan Barooni',
        data: {
          page: Route.PROJECTS,
        },
      },
      {
        path: Route.CONTACT,
        loadComponent: () => import('./contact/contact').then((m) => m.Contact),
        title: 'Contact | Ehsan Barooni',
        data: {
          page: Route.CONTACT,
        },
      },
      {
        path: Route.BUILD_INFO,
        loadComponent: () =>
          import('./build-info/build-info').then((m) => m.BuildInfo),
        title: 'Build Info | Ehsan Barooni',
        data: {
          page: Route.BUILD_INFO,
        },
      },
      {
        path: Route.APPS_BOOKMARK_STATUS,
        loadComponent: () =>
          import('./apps/bookmark-status/bookmark-status').then(
            (m) => m.BookmarkStatusPage,
          ),
        title: 'Bookmark Status for Safari on Mac | Ehsan Barooni',
        data: {
          page: Route.APPS_BOOKMARK_STATUS,
        },
      },
      { path: '**', redirectTo: Route.HOME, pathMatch: 'full' },
    ],
  },
];
