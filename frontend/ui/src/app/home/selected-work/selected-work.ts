import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { filter, fromEvent } from 'rxjs';

import { Route } from '../../config/route';
import { findProject } from '../../projects/project-catalog';
import { ArrowIcon } from '../../shared/components/arrow-icon/arrow-icon';
import { AppStore } from '../../store/app/app.store';

type WorkRow = Readonly<{
  translationKey: string;
  title: string;
  href: string;
  tags: string;
}>;

const BOOKMARK_STATUS_ASSETS = 'apps/safari-bookmark-status';
const TAG_SEPARATOR = ' · ';

function createWorkRow(translationKey: string, projectId: string): WorkRow {
  const project = findProject(projectId);

  return {
    href: project.href ?? '',
    tags: project.features.join(TAG_SEPARATOR),
    title: project.title,
    translationKey,
  };
}

@Component({
  selector: 'app-selected-work',
  imports: [ArrowIcon, NgOptimizedImage, RouterLink, TranslocoDirective],
  templateUrl: './selected-work.html',
})
export class SelectedWork {
  private readonly theme = toSignal(inject(AppStore).selectTheme$, {
    initialValue: 'light',
  });

  readonly projectsLink = `/${Route.PROJECTS}`;
  readonly featured = findProject('bookmark-status');
  readonly appIconSource = `${BOOKMARK_STATUS_ASSETS}/brand/app-icon-256.webp`;

  readonly rows: readonly WorkRow[] = [
    createWorkRow('calendar', 'capacitor-calendar'),
    createWorkRow('capawesome', 'capawesome'),
  ];

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
