import { CheckmarkComponent } from '../../svg-components/checkmark/checkmark.component';
import { Component } from '@angular/core';

@Component({
  host: {
    class: 'py-20 px-4 sm:px-8 flex justify-center bg-base-200',
  },
  imports: [CheckmarkComponent],
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
})
export class TimelineComponent {}
