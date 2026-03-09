import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block h-full',
  },
})
export class InfoCard {}
