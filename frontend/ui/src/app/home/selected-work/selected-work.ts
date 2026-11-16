import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import { Route } from '../../config/route';
import { FeaturedProject } from '../../projects/featured-project/featured-project';
import { findProject } from '../../projects/project-catalog';
import { ProjectRow } from '../../projects/project-row/project-row';
import { ArrowIcon } from '../../shared/components/arrow-icon/arrow-icon';

@Component({
  selector: 'app-selected-work',
  imports: [
    ArrowIcon,
    FeaturedProject,
    ProjectRow,
    RouterLink,
    TranslocoDirective,
  ],
  templateUrl: './selected-work.html',
})
export class SelectedWork {
  readonly projectsLink = `/${Route.PROJECTS}`;

  readonly rows = [
    findProject('capacitor-calendar'),
    findProject('capawesome'),
  ];
}
