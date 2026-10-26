import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Reveal } from '../../../shared/reveal/reveal';
import {
  BOOKMARK_STATUS_ASSETS,
  blockPlaceholderAppStoreKey,
  blockPlaceholderAppStoreLink,
  bookmarkStatusLinks,
} from '../bookmark-status.copy';
import { callToActionCopy } from './call-to-action.copy';

@Component({
  selector: 'app-bookmark-status-call-to-action',
  imports: [Reveal],
  templateUrl: './call-to-action.html',
  styleUrl: './call-to-action.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkStatusCallToAction {
  readonly copy = {
    storeHref: bookmarkStatusLinks.storeHref,
    requirements: bookmarkStatusLinks.requirements,
    finalCta: callToActionCopy,
  };
  readonly assets = BOOKMARK_STATUS_ASSETS;
  readonly blockStore = blockPlaceholderAppStoreLink;
  readonly blockStoreKey = blockPlaceholderAppStoreKey;
}
