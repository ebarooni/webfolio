import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Reveal } from '../../../shared/reveal/reveal';
import { bookmarkStatusCopy } from '../bookmark-status.copy';
import { BmsKeys } from '../bms-keys/bms-keys';

@Component({
  selector: 'app-bms-faq',
  imports: [Reveal, BmsKeys],
  templateUrl: './bms-faq.html',
  styleUrl: './bms-faq.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmsFaq {
  readonly copy = bookmarkStatusCopy;
}
