import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Hero } from '../shared/components/hero/hero';
import { PostModal } from './post-modal/post-modal';
import { AstroToAngular } from './posts/astro-to-angular/astro-to-angular';
import { VpsHosting } from './posts/vps-hosting/vps-hosting';

enum Posts {
  ASTRO_TO_ANGULAR,
  VPS_HOSTING,
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
  imports: [DatePipe, Hero, PostModal, AstroToAngular, VpsHosting],
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
    {
      date: new Date('2026-04-04'),
      id: Posts.VPS_HOSTING,
      readTime: 10,
      summary:
        'I decided to deploy my portfolio website on a VPS instead of using Firebase Hosting. In this blog post, I provide a step by step guide on the migration and explain the reason behind this decision.',
      title: 'Moving away from Firebase Hosting',
    },
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  readonly selectedPostId = signal<Posts>(this.posts[0].id);

  get Posts(): typeof Posts {
    return Posts;
  }

  viewPost(postId: Posts, dialog: PostModal): void {
    this.selectedPostId.set(postId);
    dialog.show();
  }
}
