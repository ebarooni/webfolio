import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { Route } from '../../config/route';
import { localizePath } from '../../localization/localized-path';
import { languageOfRoute } from '../../localization/site-language';
import { findPostBySlug } from '../post-catalog';

// An unknown address shows the list of posts and not an empty page.
export const postExistsGuard: CanActivateFn = (route) => {
  if (findPostBySlug(route.paramMap.get('slug') ?? '')) {
    return true;
  }

  return inject(Router).parseUrl(
    localizePath(`/${Route.BLOG}`, languageOfRoute(route)),
  );
};
