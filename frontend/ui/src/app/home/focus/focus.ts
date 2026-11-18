import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-focus',
  imports: [TranslocoDirective],
  templateUrl: './focus.html',
})
export class Focus {
  readonly areaKeys: readonly string[] = ['frontends', 'hybrid', 'fullStack'];
}
