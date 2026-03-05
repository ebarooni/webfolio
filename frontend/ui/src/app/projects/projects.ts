import { Component } from '@angular/core';
import { HeroComponent } from '../components/hero/hero.component';
import { Showcase } from './showcase/showcase';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  imports: [HeroComponent, Showcase],
  host: {
    class: 'flex flex-col flex-1',
  },
})
export class Projects {}
