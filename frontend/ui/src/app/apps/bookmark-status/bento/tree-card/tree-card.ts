import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Reveal } from '../../../../shared/reveal/reveal';
import { bookmarkStatusCopy } from '../../bookmark-status.copy';
import { BookmarkStatusKeys } from '../../keys/keys';

@Component({
  selector: 'app-bookmark-status-tree-card',
  imports: [Reveal, BookmarkStatusKeys],
  templateUrl: './tree-card.html',
  styleUrl: './tree-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkStatusTreeCard {
  readonly copy = bookmarkStatusCopy;
}
