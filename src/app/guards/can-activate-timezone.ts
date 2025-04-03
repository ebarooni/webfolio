import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';

export const canActivateTimezone: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);
  const isAllowed =
    Intl.DateTimeFormat().resolvedOptions().timeZone !== 'Asia/Tehran';

  if (!isAllowed) {
    return router.createUrlTree(['/error']);
  }
  return isAllowed;
};
