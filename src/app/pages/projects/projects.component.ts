import { BaseLayoutComponent } from '../../layouts/base-layout/base-layout.component';
import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ShowcaseComponent } from './showcase/showcase.component';

@Component({
  imports: [
    BaseLayoutComponent,
    HeroComponent,
    ShowcaseComponent,
    HeroComponent,
  ],
  selector: 'app-projects',
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {}
