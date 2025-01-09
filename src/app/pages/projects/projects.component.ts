import { Component } from '@angular/core';
import { BaseLayoutComponent } from '../../layouts/base-layout/base-layout.component';
import { HeroComponent } from './hero/hero.component';
import { ShowcaseComponent } from './showcase/showcase.component';

@Component({
  selector: 'app-projects',
  imports: [BaseLayoutComponent, HeroComponent, ShowcaseComponent],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {}
