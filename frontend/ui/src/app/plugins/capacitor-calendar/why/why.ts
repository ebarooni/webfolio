import { Component } from '@angular/core';

import { PLUGIN_LINKS } from '../capacitor-calendar.content';

/* The reasons come from "Why this plugin?" in the README. */
const REASONS = [
  {
    title: 'Established',
    body: 'Available since Capacitor 5, with years of real-world use behind it.',
  },
  {
    title: 'Actively maintained',
    body: 'The original author still owns the codebase and ships fixes and features. The latest and latest-7 tags are intended to stay in feature parity.',
  },
  {
    title: 'Fast support',
    body: 'Questions and bug reports on GitHub get quick answers.',
  },
  {
    title: 'Lower vendor risk',
    body: 'Relying on one plugin vendor for everything is risky. Independent, focused maintainers keep your stack resilient.',
  },
] as const;

@Component({
  selector: 'app-capacitor-calendar-why',
  templateUrl: './why.html',
  styleUrl: './why.css',
})
export class CapacitorCalendarWhy {
  readonly reasons = REASONS;
  readonly links = PLUGIN_LINKS;
}
