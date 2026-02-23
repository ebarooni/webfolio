import { Component, signal } from '@angular/core';
import { DEPENDENCIES, DEV_DEPENDENCIES } from '../../environments/build-info';

import { HeroComponent } from '../components/hero/hero.component';
import { DependenciesComponent } from './dependencies/dependencies.component';
import { DeploymentDetailsComponent } from './deployment-details/deployment-details.component';

@Component({
  selector: 'app-build-info',
  templateUrl: './build-info.html',
  imports: [HeroComponent, DeploymentDetailsComponent, DependenciesComponent],
  host: {
    class: 'flex flex-col grow-1',
  },
})
export class BuildInfoComponent {
  readonly dependencies = signal(DEPENDENCIES);
  readonly devDependencies = signal(DEV_DEPENDENCIES);
}
