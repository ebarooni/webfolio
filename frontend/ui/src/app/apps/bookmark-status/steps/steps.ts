import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject } from '@angular/core';

import { SiteLanguage } from '../../../localization/site-language';
import { Reveal } from '../../../shared/reveal/reveal';
import {
  BOOKMARK_STATUS_ASSETS,
  HOW_IT_WORKS_FRAGMENT,
} from '../bookmark-status.copy';
import { BookmarkStatusKeys } from '../keys/keys';
import { stepsCopy } from './steps.copy';

@Component({
  selector: 'app-bookmark-status-steps',
  imports: [NgOptimizedImage, Reveal, BookmarkStatusKeys],
  templateUrl: './steps.html',
  styleUrl: './steps.css',
})
export class BookmarkStatusSteps {
  private readonly language = inject(SiteLanguage).current;
  readonly copy = computed(() => {
    const language = this.language();

    return {
      howFragment: HOW_IT_WORKS_FRAGMENT,
      how: stepsCopy[language],
    };
  });
  readonly assets = BOOKMARK_STATUS_ASSETS;
}
