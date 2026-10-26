import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Route } from '../../../config/route';
import type { Theme } from '../../../config/themes-array';
import { Reveal } from '../../../shared/reveal/reveal';
import {
  BOOKMARK_STATUS_ASSETS,
  blockPlaceholderAppStoreKey,
  blockPlaceholderAppStoreLink,
  bookmarkStatusCopy,
} from '../bookmark-status.copy';
import { BookmarkStatusShot } from '../shot/shot';

@Component({
  selector: 'app-bookmark-status-hero',
  imports: [NgTemplateOutlet, Reveal, RouterLink, BookmarkStatusShot],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkStatusHero {
  readonly theme = input.required<Theme>();
  readonly copy = bookmarkStatusCopy;
  readonly assets = BOOKMARK_STATUS_ASSETS;
  readonly pageLink = `/${Route.APPS_BOOKMARK_STATUS}`;
  readonly blockStore = blockPlaceholderAppStoreLink;
  readonly blockStoreKey = blockPlaceholderAppStoreKey;

  trustDelay(index: number): string {
    if (index === 1) {
      return '80ms';
    }

    if (index === 2) {
      return '160ms';
    }

    return '0ms';
  }
}
