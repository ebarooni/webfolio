import { Component, input } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

export type DependencyRow = Readonly<{
  name: string;
  version: string;
}>;

function toRows(deps: Record<string, string>): DependencyRow[] {
  return Object.entries(deps)
    .map(([name, version]) => ({ name, version }) satisfies DependencyRow)
    .sort((a, b) => a.name.localeCompare(b.name));
}

@Component({
  selector: 'app-dependencies',
  imports: [TranslocoDirective],
  templateUrl: './dependencies.html',
})
export class Dependencies {
  readonly title = input.required<string>();

  readonly dependencies = input.required<
    DependencyRow[],
    Record<string, string>
  >({
    transform: (deps) => toRows(deps),
  });
}
