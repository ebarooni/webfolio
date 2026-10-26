import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { Theme } from '../../../../config/themes-array';
import { Reveal } from '../../../../shared/reveal/reveal';
import { duplicatesCardCopy } from './duplicates-card.copy';
import { BookmarkStatusShot } from '../../shot/shot';

@Component({
  selector: 'app-bookmark-status-duplicates-card',
  imports: [Reveal, BookmarkStatusShot],
  templateUrl: './duplicates-card.html',
  styleUrl: './duplicates-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkStatusDuplicatesCard {
  readonly theme = input.required<Theme>();
  readonly copy = {
    features: {
      duplicates: duplicatesCardCopy,
    },
  };
}
