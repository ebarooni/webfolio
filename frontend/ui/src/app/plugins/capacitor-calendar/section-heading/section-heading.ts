import { Component, input } from '@angular/core';

/** The label, title and lead at the top of each section of this page. */
@Component({
  selector: 'app-section-heading',
  templateUrl: './section-heading.html',
  host: {
    class: 'flex max-w-[46rem] flex-col gap-4',
    '[class.items-center]': 'centered()',
    '[class.text-center]': 'centered()',
    '[class.mx-auto]': 'centered()',
  },
})
export class SectionHeading {
  readonly label = input.required<string>();
  readonly title = input.required<string>();
  readonly lead = input('');
  readonly headingId = input.required<string>();
  readonly centered = input(false);
}
