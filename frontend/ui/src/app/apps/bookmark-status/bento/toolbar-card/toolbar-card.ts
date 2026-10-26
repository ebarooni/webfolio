import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { Theme } from '../../../../config/themes-array';
import { Reveal } from '../../../../shared/reveal/reveal';
import {
  BOOKMARK_STATUS_ASSETS,
  bookmarkStatusCopy,
} from '../../bookmark-status.copy';
import { BookmarkStatusShot } from '../../shot/shot';

@Component({
  selector: 'app-bookmark-status-toolbar-card',
  imports: [Reveal, BookmarkStatusShot],
  templateUrl: './toolbar-card.html',
  styleUrl: './toolbar-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkStatusToolbarCard {
  readonly theme = input.required<Theme>();
  readonly copy = bookmarkStatusCopy;
  readonly legendIcons = [
    BOOKMARK_STATUS_ASSETS.toolbarGrey,
    BOOKMARK_STATUS_ASSETS.toolbarBlue,
    BOOKMARK_STATUS_ASSETS.toolbarRed,
  ];
}
