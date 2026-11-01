import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Route } from '../../config/route';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  imports: [NgOptimizedImage, RouterLink],
})
export class About {
  readonly Route = Route;
}
