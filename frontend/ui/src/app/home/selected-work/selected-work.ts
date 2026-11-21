import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import { Route } from '../../config/route';
import { findProject } from '../../projects/project-catalog';
import { ProjectRow } from '../../projects/project-row/project-row';
import { ArrowLink } from '../../shared/components/arrow-link/arrow-link';
import { ProductCards } from '../product-cards/product-cards';
import { LocalizePathPipe } from '../../localization/localize-path.pipe';

@Component({
  selector: 'app-selected-work',
  imports: [
    LocalizePathPipe,
    ArrowLink,
    ProductCards,
    ProjectRow,
    RouterLink,
    TranslocoDirective,
  ],
  templateUrl: './selected-work.html',
})
export class SelectedWork {
  readonly projectsLink = `/${Route.PROJECTS}`;

  readonly rows = [findProject('capawesome'), findProject('webfolio')];
}
