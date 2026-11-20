import { Component } from '@angular/core';

import { ArrowIcon } from '../../../shared/components/arrow-icon/arrow-icon';
import { RESOURCES } from '../capacitor-calendar.content';
import { SectionHeading } from '../section-heading/section-heading';

/** Links to each topic in the plugin repository and docs. */
@Component({
  selector: 'app-capacitor-calendar-resources',
  imports: [ArrowIcon, SectionHeading],
  templateUrl: './resources.html',
  styleUrl: './resources.css',
})
export class CapacitorCalendarResources {
  readonly resources = RESOURCES;
}
