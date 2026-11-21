import { Component, computed } from '@angular/core';

import { injectCopy } from '../../../localization/localized-copy';

import { SectionHeading } from '../section-heading/section-heading';
import { answerParts, FAQ_COPY } from './faq.content';

@Component({
  selector: 'app-capacitor-calendar-faq',
  imports: [SectionHeading],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class CapacitorCalendarFaq {
  readonly copy = injectCopy(FAQ_COPY);
  readonly entries = computed(() =>
    this.copy().entries.map((entry) => ({
      ...entry,
      parts: answerParts(entry.answer),
    })),
  );
}
