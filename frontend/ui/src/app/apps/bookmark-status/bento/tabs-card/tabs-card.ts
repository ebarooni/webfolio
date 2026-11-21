import { Component, computed, inject, input } from '@angular/core';

import { SiteLanguage } from '../../../../localization/site-language';
import type { Theme } from '../../../../config/themes-array';
import { Reveal } from '../../../../shared/reveal/reveal';
import { tabsCardCopy } from './tabs-card.copy';
import { BookmarkStatusShot } from '../../shot/shot';

@Component({
  selector: 'app-bookmark-status-tabs-card',
  imports: [Reveal, BookmarkStatusShot],
  templateUrl: './tabs-card.html',
  styleUrl: './tabs-card.css',
})
export class BookmarkStatusTabsCard {
  readonly theme = input.required<Theme>();
  private readonly language = inject(SiteLanguage).current;
  readonly copy = computed(() => {
    const language = this.language();

    return {
      features: {
        tabs: tabsCardCopy[language],
      },
    };
  });
}
