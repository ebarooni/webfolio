import { Component, input } from '@angular/core';

interface DependencyRow { 
  name: string; 
  version: string 
};

@Component({
  selector: 'app-dependencies',
  templateUrl: './dependencies.html',
})
export class Dependencies {
  public readonly title = input<string>('Runtime Dependencies');
  public readonly dependencies = input.required({
    transform: (deps: Record<string, string>) => this.convertDepsToArray(deps),
  });

  private convertDepsToArray(
    deps: Record<string, string>,
  ): DependencyRow[] {
    return Object.entries(deps).map(([key, value]) => ({
      name: key,
      version: value,
    }));
  }
}
