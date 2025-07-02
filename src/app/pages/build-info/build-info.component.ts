import { Component, signal } from '@angular/core';
import {
  DEPENDENCIES,
  DEV_DEPENDENCIES,
} from '../../../environments/build-info';
import { BaseLayoutComponent } from '../../layouts/base-layout/base-layout.component';
import { DependenciesComponent } from './dependencies/dependencies.component';
import { DeploymentDetailsComponent } from './deployment-details/deployment-details.component';
import { HeroComponent } from '../../components/hero/hero.component';

@Component({
  imports: [
    BaseLayoutComponent,
    HeroComponent,
    DeploymentDetailsComponent,
    DependenciesComponent,
  ],
  selector: 'app-build-info',
  templateUrl: './build-info.component.html',
})
export class BuildInfoComponent {
  public readonly dependencies = signal(DEPENDENCIES);
  public readonly devDependencies = signal(DEV_DEPENDENCIES);
}
