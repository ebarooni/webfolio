import { Component } from '@angular/core';

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
  readonly copy = {
    features: {
      tree: treeCardCopy,
    },
  };
}
