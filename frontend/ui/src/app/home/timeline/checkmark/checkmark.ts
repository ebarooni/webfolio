import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-checkmark',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './checkmark.html',
})
export class Checkmark {}
