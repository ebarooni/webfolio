import { Component } from '@angular/core';

@Component({
  selector: 'app-container',
  template:
    '<div class="container mx-auto my-3"><ng-content></ng-content></div>',
})
export class ContainerComponent {}
