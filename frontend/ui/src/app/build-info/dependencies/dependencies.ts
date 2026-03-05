import { ChangeDetectionStrategy, Component, input } from '@angular/core';

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
  templateUrl: './dependencies.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dependencies {
  readonly title = input<string>('Runtime Dependencies');

  readonly dependencies = input.required<
    DependencyRow[],
    Record<string, string>
  >({
    transform: (deps) => toRows(deps),
  });
}
