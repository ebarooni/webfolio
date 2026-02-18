import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Route } from '../../config/constants/route';

@Component({
  host: {
    class: 'bg-base-100',
  },
  imports: [RouterLink],
  selector: 'app-about',
  templateUrl: './about.component.html',
})
export class AboutComponent {
  get Route(): typeof Route {
      return Route;
  }
}
