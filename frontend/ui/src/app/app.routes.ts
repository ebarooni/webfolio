import { Route } from './config/constants/route';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: Route.ACCESS_DENIED,
    loadComponent: () =>
      import('./access-denied/access-denied').then((m) => m.AccessDenied),
    title: 'Access denied',
    data: {
      page: Route.ACCESS_DENIED,
    },
  },
  {
    path: '',
    loadComponent: () =>
      import('./app-shell/app-shell').then((m) => m.AppShell),
    children: [
      {
        path: Route.HOME,
        loadComponent: () => import('./home/home').then((m) => m.HomeComponent),
        title: 'Ehsan Barooni | Full-Stack Software Engineer',
        data: {
          footerBgClass: 'bg-base-200',
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
        path: Route.PROJECTS,
        loadComponent: () =>
          import('./projects/projects').then((m) => m.ProjectsComponent),
        title: 'Projects | Ehsan Barooni',
        data: {
          page: Route.PROJECTS,
        },
      },
      {
        path: Route.CONTACT,
        loadComponent: () =>
          import('./contact/contact').then((m) => m.ContactComponent),
        title: 'Contact | Ehsan Barooni',
        data: {
          page: Route.CONTACT,
        },
      },
      {
        path: Route.BUILD_INFO,
        loadComponent: () =>
          import('./build-info/build-info').then((m) => m.BuildInfoComponent),
        title: 'Build Info | Ehsan Barooni',
        data: {
          page: Route.BUILD_INFO,
        },
      },
      { path: '**', redirectTo: Route.HOME, pathMatch: 'full' },
    ],
  },
];
