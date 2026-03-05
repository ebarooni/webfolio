import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-astro-to-angular',
  templateUrl: './astro-to-angular.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AstroToAngularComponent {}
