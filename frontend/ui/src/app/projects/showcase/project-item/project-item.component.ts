import { Component, computed, input } from '@angular/core';
import { OpenComponent } from './open/open.component';

export type ProjectItem = Readonly<{
  title: string;
  description: string;
  href?: string;
  features: readonly string[];
  linkAriaLabel?: string;
}>;

@Component({
  selector: 'app-project-item',
  imports: [OpenComponent],
  templateUrl: './project-item.component.html',
})
export class ProjectItemComponent {
  readonly project = input.required<ProjectItem>();

  readonly hasLink = computed(() => {
    const href = this.project().href;
    return typeof href === 'string' && href.trim().length > 0;
  });

  readonly ariaLabel = computed(() => {
    const p = this.project();
    return p.linkAriaLabel?.trim() ?? `Open ${p.title}`;
  });
}
