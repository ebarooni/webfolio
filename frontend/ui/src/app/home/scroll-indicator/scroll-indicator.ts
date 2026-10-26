import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-scroll-indicator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scroll-indicator.html',
})
export class ScrollIndicator {}
