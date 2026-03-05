import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-open',
  templateUrl: './open.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenComponent {}
