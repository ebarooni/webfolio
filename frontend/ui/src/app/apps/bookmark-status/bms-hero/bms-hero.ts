import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { Theme } from '../../../config/themes-array';
import { Reveal } from '../../../shared/reveal/reveal';
import {
  BMS_ASSETS,
  blockPlaceholderAppStoreKey,
  blockPlaceholderAppStoreLink,
  bookmarkStatusCopy,
} from '../bookmark-status.copy';
import { BmsShot } from '../bms-shot/bms-shot';

@Component({
  selector: 'app-bms-hero',
  imports: [Reveal, BmsShot],
  templateUrl: './bms-hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmsHero {
  readonly theme = input.required<Theme>();
  readonly copy = bookmarkStatusCopy;
  readonly assets = BMS_ASSETS;
  readonly blockStore = blockPlaceholderAppStoreLink;
  readonly blockStoreKey = blockPlaceholderAppStoreKey;

  trustDelay(index: number): string {
    if (index === 1) {
      return '80ms';
    }

    if (index === 2) {
      return '160ms';
    }

    return '0ms';
  }
}
