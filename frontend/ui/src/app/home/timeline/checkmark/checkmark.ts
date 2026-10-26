import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-checkmark',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkmark.html',
})
export class Checkmark {}
