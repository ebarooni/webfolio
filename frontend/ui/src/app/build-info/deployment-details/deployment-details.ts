import { Component, computed } from '@angular/core';
import { BUILD_TIME, VERSION } from '../../../environments/build-info';
import dayjs from 'dayjs';

@Component({
  selector: 'app-deployment-details',
  templateUrl: './deployment-details.html',
})
export class DeploymentDetails {
  readonly version = computed(() => VERSION);

  readonly sinceLastBuild = computed(() => {
    const now = dayjs();
    const buildTime = dayjs(BUILD_TIME);

    const hours = now.diff(buildTime, 'hour');
    if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;

    const days = now.diff(buildTime, 'day');
    return `${days} day${days === 1 ? '' : 's'} ago`;
  });
}
