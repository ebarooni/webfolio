import { Component, input } from '@angular/core';

import { PageIntro } from '../page-intro/page-intro';

@Component({
  selector: 'app-page-header',
  imports: [PageIntro],
  templateUrl: './page-header.html',
})
export class PageHeader {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly lead = input('');
}
