import { Component } from '@angular/core';
import { Hero } from '../shared/components/hero/hero';
import { Showcase } from './showcase/showcase';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  imports: [Hero, Showcase],
  host: {
    class: 'flex flex-col flex-1',
  },
})
export class Projects {}
