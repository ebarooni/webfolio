import { Component } from '@angular/core';

@Component({
  selector: 'app-container',
  template:
    '<div class="container px-4 md:px-0 mx-auto"><ng-content></ng-content></div>',
})
export class ContainerComponent {}
