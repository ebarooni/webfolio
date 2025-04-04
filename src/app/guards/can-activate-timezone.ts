import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AppStore } from '../store/app/app.store';
import { Route } from '../constants/route';
import { firstValueFrom } from 'rxjs';
import { inject } from '@angular/core';

export const canActivateTimezone: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);
  const store = inject(AppStore);

  return firstValueFrom(store.selectHasGeoAccess$).then((hasGeoAccess) => {
    const isAllowed =
      Intl.DateTimeFormat().resolvedOptions().timeZone !== 'Asia/Tehran' ||
      hasGeoAccess;

    if (!isAllowed) {
      return router.createUrlTree([`/${Route.ACCESS_DENIED}`]);
    }
    return isAllowed;
  });
};
