import { Route } from './constants/route';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    loadComponent: () =>
      import('./pages/access-denied/access-denied.component').then(
        (m) => m.AccessDeniedComponent,
      ),
    path: Route.ACCESS_DENIED,
    title: 'Access denied',
  },
  {
    loadComponent: () =>
      import('./pages/blog/blog.component').then((m) => m.BlogComponent),
    path: Route.BLOG,
    title: 'Blog | Ehsan Barooni',
  },
  {
    loadComponent: () =>
      import('./pages/projects/projects.component').then(
        (m) => m.ProjectsComponent,
      ),
    path: Route.PROJECTS,
    title: 'Projects | Ehsan Barooni',
  },
  {
    loadComponent: () =>
      import('./pages/build-info/build-info.component').then(
        (m) => m.BuildInfoComponent,
      ),
    path: Route.BUILD_INFO,
    title: 'Build Info | Ehsan Barooni',
  },
  {
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent,
      ),
    path: Route.CONTACT,
    title: 'Contact | Ehsan Barooni',
  },
  {
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    path: Route.HOME,
    title: 'Ehsan Barooni | Full-Stack Software Engineer',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: Route.HOME,
  },
];
