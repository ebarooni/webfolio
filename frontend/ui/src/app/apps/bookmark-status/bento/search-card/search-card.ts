import { Component, computed, inject, input } from '@angular/core';

import { SiteLanguage } from '../../../../localization/site-language';
import type { Theme } from '../../../../config/themes-array';
import { Reveal } from '../../../../shared/reveal/reveal';
import { searchCardCopy } from './search-card.copy';
import { BookmarkStatusShot } from '../../shot/shot';

@Component({
  selector: 'app-bookmark-status-search-card',
  imports: [Reveal, BookmarkStatusShot],
  templateUrl: './search-card.html',
  styleUrl: './search-card.css',
})
export class BookmarkStatusSearchCard {
  readonly theme = input.required<Theme>();
  private readonly language = inject(SiteLanguage).current;
  readonly copy = computed(() => {
    const language = this.language();

    return {
      features: {
        search: searchCardCopy[language],
      },
    };
  });
}
