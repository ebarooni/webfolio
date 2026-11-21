import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';

import { SiteLanguage } from '../../../../localization/site-language';
import type { Theme } from '../../../../config/themes-array';
import { Reveal } from '../../../../shared/reveal/reveal';
import { BOOKMARK_STATUS_ASSETS } from '../../bookmark-status.copy';
import { toolbarCardCopy } from './toolbar-card.copy';
import { BookmarkStatusShot } from '../../shot/shot';

@Component({
  selector: 'app-bookmark-status-toolbar-card',
  imports: [NgOptimizedImage, Reveal, BookmarkStatusShot],
  templateUrl: './toolbar-card.html',
  styleUrl: './toolbar-card.css',
})
export class BookmarkStatusToolbarCard {
  readonly theme = input.required<Theme>();
  private readonly language = inject(SiteLanguage).current;
  readonly copy = computed(() => {
    const language = this.language();

    return {
      features: {
        toolbar: toolbarCardCopy[language],
      },
    };
  });
  readonly legendIcons = [
    BOOKMARK_STATUS_ASSETS.toolbarGrey,
    BOOKMARK_STATUS_ASSETS.toolbarBlue,
    BOOKMARK_STATUS_ASSETS.toolbarRed,
  ];
}
