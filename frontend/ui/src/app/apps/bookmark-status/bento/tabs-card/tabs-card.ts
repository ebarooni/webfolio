import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { Theme } from '../../../../config/themes-array';
import { Reveal } from '../../../../shared/reveal/reveal';
import { bookmarkStatusCopy } from '../../bookmark-status.copy';
import { BookmarkStatusShot } from '../../shot/shot';

@Component({
  selector: 'app-bookmark-status-tabs-card',
  imports: [Reveal, BookmarkStatusShot],
  templateUrl: './tabs-card.html',
  styleUrl: './tabs-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkStatusTabsCard {
  readonly theme = input.required<Theme>();
  readonly copy = bookmarkStatusCopy;
}
