import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Route } from '../config/route';
import { AppStore } from '../store/app/app.store';

const TZ = ['Asia/Tehran'];

function isSuspended(): boolean {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return TZ.includes(timezone);
}

// A visitor from a suspended region who entered the password has access.
function isBlocked(): boolean {
  return isSuspended() && !inject(AppStore).hasGeoAccess();
}

export const geoAccessGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (isBlocked()) {
    return router.createUrlTree([Route.ACCESS_DENIED]);
  }

  return true;
};

export const accessDeniedGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (!isBlocked()) {
    return router.createUrlTree([Route.HOME]);
  }

  return true;
};
