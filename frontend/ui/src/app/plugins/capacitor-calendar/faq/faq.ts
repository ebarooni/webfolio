import { Component } from '@angular/core';

import { SectionHeading } from '../section-heading/section-heading';
import { answerParts, FAQ } from './faq.content';

@Component({
  selector: 'app-capacitor-calendar-faq',
  imports: [SectionHeading],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class CapacitorCalendarFaq {
  readonly entries = FAQ.map((entry) => ({
    ...entry,
    parts: answerParts(entry.answer),
  }));
}
