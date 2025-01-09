import { Component } from '@angular/core';
import { ProjectItemComponent } from './project-item/project-item.component';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  imports: [ProjectItemComponent],
})
export class ShowcaseComponent {}
