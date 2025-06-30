import { BaseLayoutComponent } from '../../layouts/base-layout/base-layout.component';
import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';

@Component({
  imports: [BaseLayoutComponent, DatePipe, HeroComponent],
  selector: 'app-blog',
  templateUrl: './blog.component.html',
})
export class BlogComponent {
  posts = [
    {
      date: new Date('2024-12-01'),
      id: 1,
      readTime: 5,
      summary:
        'A breakdown of Angular Signals and how to use them effectively.',
      title: 'Understanding Angular Signals',
    },
  ];
}
