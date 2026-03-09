import { Component, computed, input } from '@angular/core';
import { Open } from './open/open';

export type ProjectDescription = Readonly<{
  title: string;
  description: string;
  href?: string;
  features: readonly string[];
  linkAriaLabel?: string;
}>;

@Component({
  selector: 'app-project-item',
  imports: [Open],
  templateUrl: './project-item.html',
})
export class ProjectItem {
  readonly project = input.required<ProjectDescription>();

  readonly hasLink = computed(() => {
    const href = this.project().href;
    return typeof href === 'string' && href.trim().length > 0;
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
