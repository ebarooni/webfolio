import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { Theme } from '../../../config/themes-array';
import { Reveal } from '../../../shared/reveal/reveal';
import {
  BMS_ASSETS,
  bookmarkStatusCopy,
  copyPartCode,
} from '../bookmark-status.copy';
import { BmsKeys } from '../bms-keys/bms-keys';
import { BmsShot } from '../bms-shot/bms-shot';

@Component({
  selector: 'app-bms-bento',
  imports: [Reveal, BmsKeys, BmsShot],
  templateUrl: './bms-bento.html',
  styleUrls: [
    './bms-bento.css',
    './bms-bento-shots.css',
    './bms-bento-tree.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmsBento {
  readonly theme = input.required<Theme>();
  readonly copy = bookmarkStatusCopy;
  readonly assets = BMS_ASSETS;
  readonly partCode = copyPartCode;
  readonly legendIcons = [
    BMS_ASSETS.toolbarGrey,
    BMS_ASSETS.toolbarBlue,
    BMS_ASSETS.toolbarRed,
  ];
}
