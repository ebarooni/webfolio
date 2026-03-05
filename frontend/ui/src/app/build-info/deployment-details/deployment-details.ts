import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import dayjs from 'dayjs';

import { BUILD_TIME, VERSION } from '../../../environments/build-info';

function pluralize(value: number, unit: string): string {
  if (value === 1) {
    return `${value} ${unit} ago`;
  }
  return `${value} ${unit}s ago`;
}

@Component({
  selector: 'app-deployment-details',
  templateUrl: './deployment-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeploymentDetails {
  readonly version = computed(() => VERSION);

  readonly sinceLastBuild = computed(() => {
    const now = dayjs();
    const buildTime = dayjs(BUILD_TIME);

    const hours = Math.max(0, now.diff(buildTime, 'hour'));
    if (hours < 24) {
      return pluralize(hours, 'hour');
    }

    const days = Math.max(0, now.diff(buildTime, 'day'));
    return pluralize(days, 'day');
  });
}
