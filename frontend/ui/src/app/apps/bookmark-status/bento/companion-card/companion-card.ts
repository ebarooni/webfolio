import { Component, input } from '@angular/core';

import type { Theme } from '../../../../config/themes-array';
import { Reveal } from '../../../../shared/reveal/reveal';
import { companionCardCopy, copyPartCode } from './companion-card.copy';
import { BookmarkStatusShot } from '../../shot/shot';

@Component({
  selector: 'app-bookmark-status-companion-card',
  imports: [Reveal, BookmarkStatusShot],
  templateUrl: './companion-card.html',
  styleUrl: './companion-card.css',
})
export class BookmarkStatusCompanionCard {
  readonly theme = input.required<Theme>();
  readonly copy = {
    features: {
      app: companionCardCopy,
    },
  };
  readonly partCode = copyPartCode;
}
