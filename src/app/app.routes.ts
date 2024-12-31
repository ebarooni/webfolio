import { Routes } from '@angular/router';
import { Route } from './constants/route';

export const routes: Routes = [
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
