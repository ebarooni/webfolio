import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { AppStore } from '../store/app/app.store';
import { SiteLanguage } from './site-language';

/**
 * A page without a language in its address, such as the access denied
 * page, uses the language that the visitor chose before.
 */
export const activatePreferredLanguage: CanActivateFn = async () => {
  await inject(SiteLanguage).activate(inject(AppStore).language());
  return true;
};
