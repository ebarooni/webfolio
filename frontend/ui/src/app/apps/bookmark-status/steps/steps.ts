import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Reveal } from '../../../shared/reveal/reveal';
import {
  BOOKMARK_STATUS_ASSETS,
  bookmarkStatusCopy,
} from '../bookmark-status.copy';
import { BookmarkStatusKeys } from '../keys/keys';

@Component({
  selector: 'app-bookmark-status-steps',
  imports: [Reveal, BookmarkStatusKeys],
  templateUrl: './steps.html',
  styleUrl: './steps.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkStatusSteps {
  readonly copy = bookmarkStatusCopy;
  readonly assets = BOOKMARK_STATUS_ASSETS;
}
