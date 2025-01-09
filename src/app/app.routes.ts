import { Routes } from '@angular/router';
import { Route } from './constants/route';

export const routes: Routes = [
  {
    path: Route.PROJECTS,
    loadComponent: () =>
      import('./pages/projects/projects.component').then(
        (m) => m.ProjectsComponent,
      ),
  },
  {
    path: Route.BUILD_INFO,
    loadComponent: () =>
      import('./pages/build-info/build-info.component').then(
        (m) => m.BuildInfoComponent,
      ),
  },
  {
    path: Route.CONTACT,
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent,
      ),
  },
  {
    path: Route.HOME,
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
];
