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
 * as they are. The title changes again when the language changes.
 */
@Injectable({ providedIn: 'root' })
export class LocalizedTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly translocoService = inject(TranslocoService);

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

    const routeTitle = this.buildTitle(this.lastSnapshot);

    if (!routeTitle) {
      return;
    }

    if (!routeTitle.startsWith(TITLE_KEY_PREFIX)) {
      this.title.setTitle(routeTitle);
      return;
    }

    const slug = deepestChild(this.lastSnapshot.root).paramMap.get('slug');
    const postTitle = slug
      ? this.translocoService.translate(`blog.posts.${slug}.title`)
      : '';

    this.title.setTitle(
      this.translocoService.translate(routeTitle, { title: postTitle }),
    );
  }
}
