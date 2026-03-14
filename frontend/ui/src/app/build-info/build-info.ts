import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BUILD_INFO } from '../../environments/build-info';

import { Hero } from '../shared/components/hero/hero';
import { Dependencies } from './dependencies/dependencies';
import { DeploymentDetails } from './deployment-details/deployment-details';

@Component({
  selector: 'app-build-info',
  templateUrl: './build-info.html',
  imports: [Hero, DeploymentDetails, Dependencies],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col flex-1',
  },
})
export class BuildInfo {
  readonly dependencies = signal(BUILD_INFO.dependencies);
  readonly devDependencies = signal(BUILD_INFO.devDependencies);
}
