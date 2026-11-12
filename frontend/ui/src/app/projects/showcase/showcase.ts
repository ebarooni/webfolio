import { Component } from '@angular/core';

import { PROJECTS } from '../project-catalog';
import { ProjectItem } from './project-item/project-item';

@Component({
  selector: 'app-showcase',
  imports: [ProjectItem],
  templateUrl: './showcase.html',
})
export class Showcase {
  readonly projects = PROJECTS;
}
