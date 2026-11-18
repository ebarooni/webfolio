import { Component } from '@angular/core';

import { ContactPanel } from './contact-panel/contact-panel';
import { Experience } from './experience/experience';
import { Focus } from './focus/focus';
import { HomeHero } from './hero/hero';
import { LatestPosts } from './latest-posts/latest-posts';
import { SelectedWork } from './selected-work/selected-work';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  imports: [
    ContactPanel,
    Experience,
    Focus,
    HomeHero,
    LatestPosts,
    SelectedWork,
  ],
  host: {
    class: 'flex flex-1 flex-col',
  },
})
export class Home {}
