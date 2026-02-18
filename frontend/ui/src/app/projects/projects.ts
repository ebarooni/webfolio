import { Component } from '@angular/core';
import { HeroComponent } from '../components/hero/hero.component';
import { ShowcaseComponent } from './showcase/showcase.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  imports: [HeroComponent, ShowcaseComponent],
})
export class ProjectsComponent {}
