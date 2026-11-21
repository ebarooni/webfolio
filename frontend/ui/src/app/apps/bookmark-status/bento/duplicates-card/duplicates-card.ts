import { Component, computed, inject, input } from '@angular/core';

import { SiteLanguage } from '../../../../localization/site-language';
import type { Theme } from '../../../../config/themes-array';
import { Reveal } from '../../../../shared/reveal/reveal';
import { duplicatesCardCopy } from './duplicates-card.copy';
import { BookmarkStatusShot } from '../../shot/shot';

@Component({
  selector: 'app-bookmark-status-duplicates-card',
  imports: [Reveal, BookmarkStatusShot],
  templateUrl: './duplicates-card.html',
  styleUrl: './duplicates-card.css',
})
export class BookmarkStatusDuplicatesCard {
  readonly theme = input.required<Theme>();
  private readonly language = inject(SiteLanguage).current;
  readonly copy = computed(() => {
    const language = this.language();

    return {
      features: {
        duplicates: duplicatesCardCopy[language],
      },
    };
  });
}
