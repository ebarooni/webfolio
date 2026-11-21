import { Component, computed, inject } from '@angular/core';

import { SiteLanguage } from '../../../../localization/site-language';
import { Reveal } from '../../../../shared/reveal/reveal';
import { treeCardCopy } from './tree-card.copy';
import { BookmarkStatusKeys } from '../../keys/keys';

@Component({
  selector: 'app-bookmark-status-tree-card',
  imports: [Reveal, BookmarkStatusKeys],
  templateUrl: './tree-card.html',
  styleUrl: './tree-card.css',
})
export class BookmarkStatusTreeCard {
  private readonly language = inject(SiteLanguage).current;
  readonly copy = computed(() => {
    const language = this.language();

    return {
      features: {
        tree: treeCardCopy[language],
      },
    };
  });
}
