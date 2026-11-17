import { Component } from '@angular/core';

/**
 * The main action of a section. It is a link when it opens a page and a
 * button when it does an action in the page. The look is the same.
 */
@Component({
  selector: 'a[appButton], button[appButton]',
  templateUrl: './button.html',
  host: {
    class:
      'focus-ring inline-flex min-h-13 cursor-pointer items-center justify-center gap-2.5 rounded-[0.875rem] bg-ink px-6 font-semibold text-base-100 transition-opacity hover:opacity-85 disabled:opacity-50 disabled:not-aria-busy:cursor-not-allowed aria-busy:cursor-progress motion-reduce:transition-none',
  },
})
export class Button {}
