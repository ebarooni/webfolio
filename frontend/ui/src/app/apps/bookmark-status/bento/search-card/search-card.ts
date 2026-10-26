import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { Theme } from '../../../../config/themes-array';
import { Reveal } from '../../../../shared/reveal/reveal';
import { bookmarkStatusCopy } from '../../bookmark-status.copy';
import { BookmarkStatusShot } from '../../shot/shot';

@Component({
  selector: 'app-bookmark-status-search-card',
  imports: [Reveal, BookmarkStatusShot],
  templateUrl: './search-card.html',
  styleUrl: './search-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkStatusSearchCard {
  readonly theme = input.required<Theme>();
  readonly copy = bookmarkStatusCopy;
}
