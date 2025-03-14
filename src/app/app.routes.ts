import { Route } from './constants/route';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
    path: Route.ABOUT,
  },
  {
    loadComponent: () =>
      import('./pages/projects/projects.component').then(
        (m) => m.ProjectsComponent,
      ),
    path: Route.PROJECTS,
  },
  {
    loadComponent: () =>
      import('./pages/build-info/build-info.component').then(
        (m) => m.BuildInfoComponent,
      ),
    path: Route.BUILD_INFO,
  },
  {
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent,
      ),
    path: Route.CONTACT,
  },
  {
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    path: Route.HOME,
  },
];
