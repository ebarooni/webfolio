import { inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

import { splitLanguagePrefix } from './localized-path';

/**
 * Gives the address of the page on the screen without its language prefix,
 * for example "/projects" on "/de/projects". Call it in an injection context.
 */
export function injectPagePath(): Signal<string> {
  const router = inject(Router);

  return toSignal(
    router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => splitLanguagePrefix(router.url).path),
    ),
    { initialValue: splitLanguagePrefix(router.url).path },
  );
}
