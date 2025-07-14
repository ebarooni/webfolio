import { Component, signal } from '@angular/core';
import { AstroToAngularComponent } from './posts/astro-to-angular/astro-to-angular.component';
import { BaseLayoutComponent } from '../../layouts/base-layout/base-layout.component';
import { DatePipe } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { PostModalComponent } from './post-modal/post-modal.component';

enum Posts {
  ASTRO_TO_ANGULAR,
}

@Component({
  imports: [
    AstroToAngularComponent,
    BaseLayoutComponent,
    DatePipe,
    HeroComponent,
    PostModalComponent,
  ],
  selector: 'app-blog',
  templateUrl: './blog.component.html',
})
export class BlogComponent {
  readonly selectedPostId = signal<Posts>(Posts.ASTRO_TO_ANGULAR);

  posts = [
    {
      date: new Date('2024-12-01'),
      id: 1,
      readTime: 4,
      summary:
        'Why static simplicity wasn’t enough for my portfolio and how Angular gave me room to grow.',
      title: 'From Astro to Angular: Why I Rebuilt My Portfolio',
    },
  ];

  get Posts(): typeof Posts {
    return Posts;
  }

  viewPost(post: Posts, dialog: PostModalComponent) {
    this.selectedPostId.set(post);
    dialog.show();
  }
}
