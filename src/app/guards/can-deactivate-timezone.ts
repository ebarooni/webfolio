import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Route } from '../constants/route';
import { inject } from '@angular/core';

export const canDeactivateTimezone: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);
  const isAllowed =
    Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Tehran';

  if (!isAllowed) {
    return router.createUrlTree([`/${Route.HOME}`]);
  }
  return isAllowed;
};
