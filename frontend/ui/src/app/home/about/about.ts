import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Route } from '../../config/route';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  readonly Route = Route;
}
