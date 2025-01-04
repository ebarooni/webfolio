import { Component, input } from '@angular/core';

@Component({
  selector: 'app-dependencies',
  templateUrl: './dependencies.component.html',
})
export class DependenciesComponent {
  public readonly title = input<string>('Dependencies');
  public readonly dependencies = input.required({
    transform: (deps: Record<string, string>) => this.convertDepsToArray(deps),
  });

  private convertDepsToArray(
    deps: Record<string, string>,
  ): { name: string; version: string }[] {
    return Object.entries(deps).map(([key, value]) => ({
      name: key,
      version: value,
    }));
  }
}
