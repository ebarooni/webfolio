import { Component } from '@angular/core';
import { Route } from '../config/constants/route';

@Component({
  selector: 'app-base-routing',
  template: '',
})
export class BaseRoutingComponent {
  get Route(): typeof Route {
    return Route;
  }
}
