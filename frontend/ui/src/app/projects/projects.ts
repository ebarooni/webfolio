import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

import { PageHeader } from '../shared/components/page-header/page-header';
import { FeaturedProject } from './featured-project/featured-project';
import { FEATURED_PROJECT_ID, PROJECTS } from './project-catalog';
import { ProjectRow } from './project-row/project-row';

@Component({
  selector: 'app-projects',
  imports: [FeaturedProject, PageHeader, ProjectRow, TranslocoDirective],
  templateUrl: './projects.html',
})
export class Projects {
  readonly projectCount = PROJECTS.length;

  readonly otherProjects = PROJECTS.filter(
    (project) => project.id !== FEATURED_PROJECT_ID,
  );
}
