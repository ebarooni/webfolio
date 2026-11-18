import { Component, input } from '@angular/core';

export type PageIntroSize = 'page' | 'compact';

/**
 * The eyebrow, the title and the lead at the top of a screen. Content
 * inside the element shows below the lead.
 */
@Component({
  selector: 'app-page-intro',
  templateUrl: './page-intro.html',
  host: {
    class: 'flex flex-col items-start gap-7',
  },
})
export class PageIntro {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly lead = input('');
  readonly titleId = input<string | null>(null);
  readonly size = input<PageIntroSize>('page');
}
