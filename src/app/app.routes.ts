import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Route } from './constants/route';

export const routes: Routes = [
  {
    path: Route.HOME,
    component: HomeComponent,
  },
];
