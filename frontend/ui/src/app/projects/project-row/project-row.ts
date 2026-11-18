import { Component, computed, input } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

import { ArrowIcon } from '../../shared/components/arrow-icon/arrow-icon';
import { type CatalogProject } from '../project-catalog';

const TAG_SEPARATOR = ' · ';

@Component({
  selector: 'app-project-row',
  imports: [ArrowIcon, TranslocoDirective],
  templateUrl: './project-row.html',
})
export class ProjectRow {
  readonly project = input.required<CatalogProject>();

  readonly tags = computed(() => this.project().tags.join(TAG_SEPARATOR));
}
