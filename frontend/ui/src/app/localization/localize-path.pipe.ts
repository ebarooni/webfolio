import { inject, Pipe, PipeTransform } from '@angular/core';

import { localizePath } from './localized-path';
import { SiteLanguage } from './site-language';

/**
 * Gives an app address in the language of the current page, for example
 * "/projects" becomes "/de/projects" on a German page. The pipe is impure,
 * because the navbar stays on the screen when the language changes.
 */
@Pipe({ name: 'localizePath', pure: false })
export class LocalizePathPipe implements PipeTransform {
  private readonly siteLanguage = inject(SiteLanguage);

  transform(path: string): string;
  transform(path: string | null | undefined): string | null;
  transform(path: string | null | undefined): string | null {
    // No path means no link, as for routerLink itself.
    return path == null
      ? null
      : localizePath(path, this.siteLanguage.current());
  }
}
