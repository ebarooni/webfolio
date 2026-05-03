import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Route } from '../config/route';

const TZ = ['Asia/Tehran'];

function isSuspended(): boolean {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return TZ.includes(timezone);
}

export const geoAccessGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (isSuspended()) {
    return router.createUrlTree([Route.ACCESS_DENIED]);
  }

  return true;
};

export const accessDeniedGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (!isSuspended()) {
    return router.createUrlTree([Route.HOME]);
  }

  return true;
};
