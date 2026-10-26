import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Open } from './open/open';

export type ProjectDescription = Readonly<{
  title: string;
  description: string;
  href?: string;
  internalPath?: string;
  features: readonly string[];
  linkAriaLabel?: string;
}>;

@Component({
  selector: 'app-project-item',
  imports: [Open, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-item.html',
})
export class ProjectItem {
  readonly project = input.required<ProjectDescription>();

  readonly linkKind = computed((): 'internal' | 'external' | 'none' => {
    const project = this.project();
    const internalPath = project.internalPath?.trim() ?? '';

    if (internalPath.length > 0) {
      return 'internal';
    }

    const href = project.href?.trim() ?? '';

    if (href.length > 0) {
      return 'external';
    }

    return 'none';
  });

  readonly hasLink = computed(() => {
    return this.linkKind() !== 'none';
  });

  readonly ariaLabel = computed(() => {
    const p = this.project();

    const custom = p.linkAriaLabel?.trim();
    if (custom && custom.length > 0) {
      return custom;
    }

    return `Open ${p.title}`;
  });
}
