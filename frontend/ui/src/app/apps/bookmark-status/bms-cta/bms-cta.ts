import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Reveal } from '../../../shared/reveal/reveal';
import {
  BMS_ASSETS,
  blockPlaceholderAppStoreKey,
  blockPlaceholderAppStoreLink,
  bookmarkStatusCopy,
} from '../bookmark-status.copy';

@Component({
  selector: 'app-bms-cta',
  imports: [Reveal],
  templateUrl: './bms-cta.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmsCta {
  readonly copy = bookmarkStatusCopy;
  readonly assets = BMS_ASSETS;
  readonly blockStore = blockPlaceholderAppStoreLink;
  readonly blockStoreKey = blockPlaceholderAppStoreKey;
}
