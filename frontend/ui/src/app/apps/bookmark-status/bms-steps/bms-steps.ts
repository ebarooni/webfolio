import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Reveal } from '../../../shared/reveal/reveal';
import { BMS_ASSETS, bookmarkStatusCopy } from '../bookmark-status.copy';
import { BmsKeys } from '../bms-keys/bms-keys';

@Component({
  selector: 'app-bms-steps',
  imports: [Reveal, BmsKeys],
  templateUrl: './bms-steps.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmsSteps {
  readonly copy = bookmarkStatusCopy;
  readonly assets = BMS_ASSETS;
}
