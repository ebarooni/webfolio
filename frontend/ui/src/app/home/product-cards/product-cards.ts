import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { filter, fromEvent } from 'rxjs';

import { Route } from '../../config/route';
import { PACKAGE_NAME } from '../../plugins/capacitor-calendar/capacitor-calendar.content';
import { findProject } from '../../projects/project-catalog';
import { ArrowIcon } from '../../shared/components/arrow-icon/arrow-icon';
import { LocalizePathPipe } from '../../localization/localize-path.pipe';

const BOOKMARK_STATUS_ASSETS = 'apps/safari-bookmark-status/brand';
const SHIELDS = 'https://img.shields.io';

/*
 * The plugin and the app side by side. The cards hold no numbers that
 * change with a release. The badges load the live numbers on each visit.
 */
@Component({
  selector: 'app-product-cards',
  imports: [
    LocalizePathPipe,
    ArrowIcon,
    NgOptimizedImage,
    RouterLink,
    TranslocoDirective,
  ],
  templateUrl: './product-cards.html',
  styleUrl: './product-cards.css',
})
export class ProductCards {
  readonly calendarLink = `/${Route.PLUGINS_CAPACITOR_CALENDAR}`;
  readonly bookmarkLink = `/${Route.APPS_BOOKMARK_STATUS}`;
  readonly bookmarkTitle = findProject('bookmark-status').title;
  readonly bookmarkIconSource = `${BOOKMARK_STATUS_ASSETS}/app-icon-256.webp`;

  readonly downloadsBadge = `${SHIELDS}/npm/dm/${PACKAGE_NAME}?style=flat-square&label=downloads`;
  readonly starsBadge = `${SHIELDS}/github/stars/ebarooni/capacitor-calendar?style=flat-square&logo=github&label=stars`;

  // The toolbar button turns blue as it does in the real app.
  readonly isBookmarked = signal(false);

  readonly toolbarIconSource = computed(() => {
    const color = this.isBookmarked() ? 'blue' : 'grey';

    return `${BOOKMARK_STATUS_ASSETS}/toolbar-${color}-32.png`;
  });

  constructor() {
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
