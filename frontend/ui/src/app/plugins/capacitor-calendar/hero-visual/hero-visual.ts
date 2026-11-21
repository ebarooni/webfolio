import { Component } from '@angular/core';

import { injectCopy } from '../../../localization/localized-copy';
import { HERO_VISUAL_COPY } from './hero-visual.copy';

const DAYS_IN_MONTH = 30;
const DAYS_WITH_EVENTS: ReadonlySet<number> = new Set([3, 9, 12, 17, 18, 24]);
const SELECTED_DAY = 17;

type DayCell = Readonly<{
  day: number;
  hasEvent: boolean;
  selected: boolean;
}>;

/**
 * A drawing of a month view with one new event. It is decoration, so it
 * shows no real date and no plugin API.
 */
@Component({
  selector: 'app-hero-visual',
  templateUrl: './hero-visual.html',
  styleUrl: './hero-visual.css',
  host: {
    'aria-hidden': 'true',
  },
})
export class HeroVisual {
  readonly copy = injectCopy(HERO_VISUAL_COPY);
  readonly days: readonly DayCell[] = Array.from(
    { length: DAYS_IN_MONTH },
    (_, index) => ({
      day: index + 1,
      hasEvent: DAYS_WITH_EVENTS.has(index + 1),
      selected: index + 1 === SELECTED_DAY,
    }),
  );
}
