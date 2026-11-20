import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  TitleStrategy,
} from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { switchMap } from 'rxjs';

import { RouteSeoWriter } from '../shared/seo/route-seo';

const TITLE_KEY_PREFIX = 'pageTitles.';

function deepestChild(root: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
  let snapshot = root;

  while (snapshot.firstChild) {
    snapshot = snapshot.firstChild;
  }

  return snapshot;
}

/**
 * Sets the browser tab title in the active language. A route title that
 * starts with "pageTitles." is a translation key. Other route titles stay
 * as they are. Then it writes the other head tags of the page.
 */
@Injectable({ providedIn: 'root' })
export class LocalizedTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly translocoService = inject(TranslocoService);
  private readonly routeSeoWriter = inject(RouteSeoWriter);

  private lastSnapshot: RouterStateSnapshot | null = null;

  constructor() {
    super();

    // The translations of a new language load after the change.
    this.translocoService.langChanges$
      .pipe(
        switchMap((language) =>
          this.translocoService.selectTranslation(language),
        ),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.applyTitle();
      });
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.lastSnapshot = snapshot;
    this.applyTitle();
  }

  private applyTitle(): void {
    if (!this.lastSnapshot) {
      return;
    }

    const title = this.translatedTitle(this.lastSnapshot);

    if (!title) {
      return;
    }

    this.title.setTitle(title);
    // The head tags for search engines change with each page.
    this.routeSeoWriter.write(this.lastSnapshot, title);
  }

  private translatedTitle(snapshot: RouterStateSnapshot): string | undefined {
    const routeTitle = this.buildTitle(snapshot);

    if (!routeTitle?.startsWith(TITLE_KEY_PREFIX)) {
      return routeTitle;
    }

    const slug = deepestChild(snapshot.root).paramMap.get('slug');
    const postTitle = slug
      ? this.translocoService.translate(`blog.posts.${slug}.title`)
      : '';

    return this.translocoService.translate(routeTitle, { title: postTitle });
  }
}
