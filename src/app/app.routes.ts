import { Routes } from '@angular/router';
import { Route } from './constants/route';

export const routes: Routes = [
  {
    path: Route.HOME,
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
];
