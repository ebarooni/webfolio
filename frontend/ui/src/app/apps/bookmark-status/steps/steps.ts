import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Reveal } from '../../../shared/reveal/reveal';
import {
  BOOKMARK_STATUS_ASSETS,
  HOW_IT_WORKS_FRAGMENT,
} from '../bookmark-status.copy';
import { BookmarkStatusKeys } from '../keys/keys';
import { stepsCopy } from './steps.copy';

@Component({
  selector: 'app-bookmark-status-steps',
  imports: [Reveal, BookmarkStatusKeys],
  templateUrl: './steps.html',
  styleUrl: './steps.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkStatusSteps {
  readonly copy = {
    howFragment: HOW_IT_WORKS_FRAGMENT,
    how: stepsCopy,
  };
  readonly assets = BOOKMARK_STATUS_ASSETS;
}
