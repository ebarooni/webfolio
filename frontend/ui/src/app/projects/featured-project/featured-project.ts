import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { filter, fromEvent } from 'rxjs';

import { ArrowIcon } from '../../shared/components/arrow-icon/arrow-icon';
import { AppStore } from '../../store/app/app.store';
import { FEATURED_PROJECT_ID, findProject } from '../project-catalog';

const BOOKMARK_STATUS_ASSETS = 'apps/safari-bookmark-status';

@Component({
  selector: 'app-featured-project',
  imports: [ArrowIcon, NgOptimizedImage, RouterLink, TranslocoDirective],
  templateUrl: './featured-project.html',
})
export class FeaturedProject {
  private readonly theme = inject(AppStore).theme;

  readonly featured = findProject(FEATURED_PROJECT_ID);
  readonly appIconSource = `${BOOKMARK_STATUS_ASSETS}/brand/app-icon-256.webp`;

  // The toolbar button turns blue as it does in the real app.
  readonly isBookmarked = signal(false);

  readonly toolbarIconSource = computed(() => {
    const color = this.isBookmarked() ? 'blue' : 'grey';

    return `${BOOKMARK_STATUS_ASSETS}/brand/toolbar-${color}-32.png`;
  });

  // The large file keeps the screenshot sharp on dense screens.
  readonly screenshotSource = computed(
    () => `${BOOKMARK_STATUS_ASSETS}/shots/hero-tree-${this.theme()}@2x.webp`,
  );

  constructor() {
    // The page can see the bookmark shortcut. It cannot see the bookmark.
    fromEvent<KeyboardEvent>(inject(DOCUMENT), 'keydown')
      .pipe(
        filter(
          (event) =>
            (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'd',
        ),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.isBookmarked.set(true);
      });
  }
}
