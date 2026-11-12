import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-experience',
  imports: [TranslocoDirective],
  templateUrl: './experience.html',
})
export class Experience {
  readonly stepKeys: readonly string[] = [
    'engineer',
    'graduate',
    'intern',
    'student',
  ];
}
