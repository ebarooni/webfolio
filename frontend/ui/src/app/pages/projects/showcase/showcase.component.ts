import { Component } from '@angular/core';
import { OpenComponent } from '../../../svg-components/open/open.component';
import { ProjectItemComponent } from './project-item/project-item.component';

@Component({
  imports: [ProjectItemComponent, OpenComponent],
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
})
export class ShowcaseComponent {}
