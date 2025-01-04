import { Component, signal } from '@angular/core';
import { BUILD_TIME, VERSION } from '../../../../environments/build-info';
import dayjs from 'dayjs';

@Component({
  selector: 'app-deployment-details',
  templateUrl: './deployment-details.component.html',
})
export class DeploymentDetailsComponent {
  readonly version = signal(VERSION);
  readonly sinceLastBuild = signal(this.computeTimeSinceLastBuild());

  private computeTimeSinceLastBuild(): string {
    const now = dayjs();
    const buildTime = dayjs(BUILD_TIME);
    const diffInHours = now.diff(buildTime, 'hour');
    const diffInDays = now.diff(buildTime, 'day');

    let timeSinceBuild;

    if (diffInHours < 24) {
      timeSinceBuild = `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      timeSinceBuild = `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }

    return timeSinceBuild;
  }
}
