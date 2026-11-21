import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Route } from '../config/route';
import { AppStore } from '../store/app/app.store';
import { isRestrictedZone } from './restricted-zone';

// A visitor in a restricted zone who entered the password has access. The
// prerender step runs on the build machine, so its time zone never matters.
function isBlocked(): boolean {
  return (
    isPlatformBrowser(inject(PLATFORM_ID)) &&
    isRestrictedZone() &&
    !inject(AppStore).hasGeoAccess()
  );
}

export const accessGuard: CanActivateFn = () => {
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
