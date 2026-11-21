import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import { Route } from '../../config/route';
import { Monogram } from '../../shared/components/monogram/monogram';
import { Portrait } from '../../shared/components/portrait/portrait';
import { LocalizePathPipe } from '../../localization/localize-path.pipe';

@Component({
  selector: 'app-brand',
  imports: [
    LocalizePathPipe,
    Monogram,
    Portrait,
    RouterLink,
    TranslocoDirective,
  ],
  templateUrl: './brand.html',
  styleUrl: './brand.css',
})
export class Brand {
  readonly homeLink = `/${Route.HOME}`;
}
