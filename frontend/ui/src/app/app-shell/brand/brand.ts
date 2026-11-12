import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import { Route } from '../../config/route';
import { Portrait } from '../../shared/components/portrait/portrait';

@Component({
  selector: 'app-brand',
  imports: [Portrait, RouterLink, TranslocoDirective],
  templateUrl: './brand.html',
  styleUrl: './brand.css',
})
export class Brand {
  readonly homeLink = `/${Route.HOME}`;
}
