import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Reveal } from '../../../shared/reveal/reveal';
import { bookmarkStatusCopy } from '../bookmark-status.copy';

@Component({
  selector: 'app-bms-privacy',
  imports: [Reveal],
  templateUrl: './bms-privacy.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmsPrivacy {
  readonly copy = bookmarkStatusCopy;
}
