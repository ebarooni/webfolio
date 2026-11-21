import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import { ArrowIcon } from '../../shared/components/arrow-icon/arrow-icon';
import { type CatalogProject } from '../project-catalog';
import { LocalizePathPipe } from '../../localization/localize-path.pipe';

const TAG_SEPARATOR = ' · ';

@Component({
  selector: 'app-project-row',
  imports: [
    LocalizePathPipe,
    ArrowIcon,
    NgTemplateOutlet,
    RouterLink,
    TranslocoDirective,
  ],
  templateUrl: './project-row.html',
})
export class ProjectRow {
  readonly project = input.required<CatalogProject>();

  readonly rowClass =
    'group focus-ring flex flex-col gap-x-10 gap-y-2 py-7 transition-[padding] hover:pl-3 motion-reduce:transition-none lg:grid lg:grid-cols-[19rem_minmax(0,1fr)_17.5rem] lg:items-baseline';

  readonly tags = computed(() => this.project().tags.join(TAG_SEPARATOR));
}
