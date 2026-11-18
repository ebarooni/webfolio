import { Component, input } from '@angular/core';

import { ArrowIcon } from '../arrow-icon/arrow-icon';

/** A text link with an arrow, for example "All posts" or "Back". */
@Component({
  selector: 'a[appArrowLink]',
  imports: [ArrowIcon],
  templateUrl: './arrow-link.html',
  host: {
    class:
      'focus-ring inline-flex min-h-11 items-center gap-2 rounded-lg text-[0.9375rem] font-medium text-ink hover:text-primary',
  },
})
export class ArrowLink {
  readonly direction = input<'forward' | 'back'>('forward');
}
