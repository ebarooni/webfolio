import { Component } from '@angular/core';

import {
  CAPABILITIES,
  COMPATIBILITY,
  REQUIREMENTS,
  type Support,
} from '../capacitor-calendar.content';
import { SectionHeading } from '../section-heading/section-heading';

const SUPPORT_LABELS: Readonly<Record<Support, string>> = {
  yes: 'Supported',
  no: 'Not supported',
  partial: 'Create only, as an .ics file',
};

@Component({
  selector: 'app-capacitor-calendar-platforms',
  imports: [SectionHeading],
  templateUrl: './platforms.html',
  styleUrl: './platforms.css',
})
export class CapacitorCalendarPlatforms {
  readonly capabilities = CAPABILITIES;
  readonly compatibility = COMPATIBILITY;
  readonly requirements = REQUIREMENTS;

  supportLabel(support: Support): string {
    return SUPPORT_LABELS[support];
  }
}
