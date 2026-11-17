import { Component, computed } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

import { BUILD_INFO } from '../../../environments/build-info';
import { injectActiveLanguage } from '../../localization/active-language';
import { ShortDate } from '../../shared/short-date/short-date';

const MS_PER_MINUTE = 60_000;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

// The text says how long ago the build was, in the largest unit that fits.
export function describeAge(
  buildTime: Date,
  now: Date,
  language: string,
): string {
  const formatter = new Intl.RelativeTimeFormat(language, {
    numeric: 'always',
  });
  const minutes = Math.max(
    0,
    Math.floor((now.getTime() - buildTime.getTime()) / MS_PER_MINUTE),
  );

  if (minutes < MINUTES_PER_HOUR) {
    return formatter.format(-minutes, 'minute');
  }

  const hours = Math.floor(minutes / MINUTES_PER_HOUR);

  if (hours < HOURS_PER_DAY) {
    return formatter.format(-hours, 'hour');
  }

  return formatter.format(-Math.floor(hours / HOURS_PER_DAY), 'day');
}

@Component({
  selector: 'app-build-facts',
  imports: [ShortDate, TranslocoDirective],
  templateUrl: './build-facts.html',
})
export class BuildFacts {
  readonly language = injectActiveLanguage();

  readonly version = BUILD_INFO.version;
  readonly buildTime = new Date(BUILD_INFO.buildTime);

  readonly sinceLastBuild = computed(() =>
    describeAge(this.buildTime, new Date(), this.language()),
  );
}
