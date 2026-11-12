import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Hero } from '../shared/components/hero/hero';
import { BLOG_POSTS, Posts } from './post-catalog';
import { PostModal } from './post-modal/post-modal';
import { AstroToAngular } from './posts/astro-to-angular/astro-to-angular';
import { VpsHosting } from './posts/vps-hosting/vps-hosting';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.html',
  imports: [DatePipe, Hero, PostModal, AstroToAngular, VpsHosting],
  host: {
    class: 'flex flex-col flex-1',
  },
})
export class BlogComponent {
  readonly posts = BLOG_POSTS;

  readonly selectedPostId = signal<Posts>(this.posts[0].id);

  get Posts(): typeof Posts {
    return Posts;
  }

  viewPost(postId: Posts, dialog: PostModal): void {
    this.selectedPostId.set(postId);
    dialog.show();
  }
}
