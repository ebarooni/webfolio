import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { Theme } from '../../../../config/themes-array';
import { Reveal } from '../../../../shared/reveal/reveal';
import { bookmarkStatusCopy, copyPartCode } from '../../bookmark-status.copy';
import { BookmarkStatusShot } from '../../shot/shot';

@Component({
  selector: 'app-bookmark-status-companion-card',
  imports: [Reveal, BookmarkStatusShot],
  templateUrl: './companion-card.html',
  styleUrl: './companion-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkStatusCompanionCard {
  readonly theme = input.required<Theme>();
  readonly copy = bookmarkStatusCopy;
  readonly partCode = copyPartCode;
}
