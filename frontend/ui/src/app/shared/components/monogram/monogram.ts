import { Component } from '@angular/core';

/** The "EB" tile of the brand. Screen readers skip it. */
@Component({
  selector: 'app-monogram',
  templateUrl: './monogram.html',
  host: {
    'aria-hidden': 'true',
    class:
      'grid size-8 shrink-0 place-items-center rounded-[9px] bg-ink text-[13px] font-semibold tracking-[0.02em] text-base-100',
  },
})
export class Monogram {}
