import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

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
  readonly copy = {
    features: {
      toolbar: toolbarCardCopy,
    },
  };
  readonly legendIcons = [
    BOOKMARK_STATUS_ASSETS.toolbarGrey,
    BOOKMARK_STATUS_ASSETS.toolbarBlue,
    BOOKMARK_STATUS_ASSETS.toolbarRed,
  ];
}
