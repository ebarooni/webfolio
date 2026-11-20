import { Component, input } from '@angular/core';

export type Brand = 'github' | 'npm';

/** The GitHub and npm marks, in the current text color. */
@Component({
  selector: 'app-brand-icon',
  templateUrl: './brand-icon.html',
  host: {
    class: 'inline-block size-[1.125em] shrink-0',
    'aria-hidden': 'true',
  },
})
export class BrandIcon {
  readonly brand = input.required<Brand>();
}
