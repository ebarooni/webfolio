import { Component, input } from '@angular/core';

export type ArrowDirection = 'forward' | 'back' | 'down' | 'external';

@Component({
  selector: 'app-arrow-icon',
  templateUrl: './arrow-icon.html',
  host: {
    class: 'inline-block size-[1.125em] shrink-0',
    '[class.rotate-180]': "direction() === 'back'",
    '[class.rotate-90]': "direction() === 'down'",
    '[class.-rotate-45]': "direction() === 'external'",
  },
})
export class ArrowIcon {
  readonly direction = input<ArrowDirection>('forward');
}
