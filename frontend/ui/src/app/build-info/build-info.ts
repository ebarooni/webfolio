import { Component, computed } from '@angular/core';
import { DEPENDENCIES, DEV_DEPENDENCIES } from '../../environments/build-info';

import { HeroComponent } from '../components/hero/hero.component';
import { DependenciesComponent } from './dependencies/dependencies.component';
import { DeploymentDetails } from './deployment-details/deployment-details.component';

@Component({
  selector: 'app-build-info',
  templateUrl: './build-info.html',
  imports: [HeroComponent, DeploymentDetails, DependenciesComponent],
  host: {
    class: 'flex flex-col flex-1',
  },
})
export class BuildInfo {
  readonly dependencies = computed(() => DEPENDENCIES);
  readonly devDependencies = computed(() => DEV_DEPENDENCIES);
}
