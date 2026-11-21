import { Component, computed, inject, input } from '@angular/core';

import { SiteLanguage } from '../../../../localization/site-language';
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
  private readonly language = inject(SiteLanguage).current;
  readonly copy = computed(() => {
    const language = this.language();

    return {
      features: {
        app: companionCardCopy[language],
      },
    };
  });
  readonly partCode = copyPartCode;
}
