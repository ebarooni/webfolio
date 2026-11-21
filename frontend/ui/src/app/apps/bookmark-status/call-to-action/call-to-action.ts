import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject } from '@angular/core';

import { SiteLanguage } from '../../../localization/site-language';
import { Reveal } from '../../../shared/reveal/reveal';
import {
  BOOKMARK_STATUS_ASSETS,
  blockPlaceholderAppStoreKey,
  blockPlaceholderAppStoreLink,
  bookmarkStatusLinks,
  REQUIREMENTS,
} from '../bookmark-status.copy';
import { callToActionCopy } from './call-to-action.copy';

@Component({
  selector: 'app-bookmark-status-call-to-action',
  imports: [NgOptimizedImage, Reveal],
  templateUrl: './call-to-action.html',
  styleUrl: './call-to-action.css',
})
export class BookmarkStatusCallToAction {
  private readonly language = inject(SiteLanguage).current;
  readonly copy = computed(() => {
    const language = this.language();

    return {
      storeHref: bookmarkStatusLinks.storeHref,
      requirements: REQUIREMENTS[language],
      finalCta: callToActionCopy[language],
    };
  });
  readonly assets = BOOKMARK_STATUS_ASSETS;
  readonly blockStore = blockPlaceholderAppStoreLink;
  readonly blockStoreKey = blockPlaceholderAppStoreKey;
}
