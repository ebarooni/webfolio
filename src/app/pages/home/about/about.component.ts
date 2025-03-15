import { BaseRoutingComponent } from '../../../extends/base-routing.component';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  host: {
    class: 'bg-base-100',
  },
  imports: [RouterLink],
  selector: 'app-about',
  templateUrl: './about.component.html',
})
export class AboutComponent extends BaseRoutingComponent {}
