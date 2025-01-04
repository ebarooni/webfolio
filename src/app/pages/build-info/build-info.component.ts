import { Component, signal } from '@angular/core';
import { BaseLayoutComponent } from '../../layouts/base-layout/base-layout.component';
import { HeroComponent } from './hero/hero.component';
import { DeploymentDetailsComponent } from './deployment-details/deployment-details.component';
import { DependenciesComponent } from './dependencies/dependencies.component';
import {
  DEPENDENCIES,
  DEV_DEPENDENCIES,
} from '../../../environments/build-info';

@Component({
  selector: 'app-build-info',
  imports: [
    BaseLayoutComponent,
    HeroComponent,
    DeploymentDetailsComponent,
    DependenciesComponent,
  ],
  templateUrl: './build-info.component.html',
})
export class BuildInfoComponent {
  public readonly dependencies = signal(DEPENDENCIES);
  public readonly devDependencies = signal(DEV_DEPENDENCIES);
}
