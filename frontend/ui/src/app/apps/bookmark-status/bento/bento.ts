import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { Theme } from '../../../config/themes-array';
import { Reveal } from '../../../shared/reveal/reveal';
import { bookmarkStatusCopy } from '../bookmark-status.copy';
import { BookmarkStatusCompanionCard } from './companion-card/companion-card';
import { BookmarkStatusDuplicatesCard } from './duplicates-card/duplicates-card';
import { BookmarkStatusSearchCard } from './search-card/search-card';
import { BookmarkStatusTabsCard } from './tabs-card/tabs-card';
import { BookmarkStatusToolbarCard } from './toolbar-card/toolbar-card';
import { BookmarkStatusTreeCard } from './tree-card/tree-card';

@Component({
  selector: 'app-bookmark-status-bento',
  imports: [
    Reveal,
    BookmarkStatusCompanionCard,
    BookmarkStatusDuplicatesCard,
    BookmarkStatusSearchCard,
    BookmarkStatusTabsCard,
    BookmarkStatusToolbarCard,
    BookmarkStatusTreeCard,
  ],
  templateUrl: './bento.html',
  styleUrl: './bento.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkStatusBento {
  readonly theme = input.required<Theme>();
  readonly copy = bookmarkStatusCopy;
}
