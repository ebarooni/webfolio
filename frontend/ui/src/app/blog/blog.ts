import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

import { HeroComponent } from '../components/hero/hero.component';
import { PostModalComponent } from './post-modal/post-modal.component';
import { AstroToAngularComponent } from './posts/astro-to-angular/astro-to-angular.component';

enum Posts {
  ASTRO_TO_ANGULAR,
}

type BlogPostPreview = Readonly<{
  date: Date;
  id: Posts;
  readTime: number;
  summary: string;
  title: string;
}>;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.html',
  imports: [
    DatePipe,
    HeroComponent,
    PostModalComponent,
    AstroToAngularComponent,
  ],
  host: {
    class: 'flex flex-col flex-1',
  },
})
export class BlogComponent {
  readonly posts: readonly BlogPostPreview[] = [
    {
      date: new Date('2024-12-01'),
      id: Posts.ASTRO_TO_ANGULAR,
      readTime: 3,
      summary:
        'Why static simplicity wasn’t enough for my portfolio and how Angular gave me room to grow.',
      title: 'From Astro to Angular: Why I Rebuilt My Portfolio',
    },
  ] as const;

  readonly selectedPostId = signal<Posts>(this.posts[0].id);

  get Posts(): typeof Posts {
    return Posts;
  }

  viewPost(postId: Posts, dialog: PostModalComponent): void {
    this.selectedPostId.set(postId);
    dialog.show();
  }
}
