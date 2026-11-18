import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import { BLOG_POSTS } from '../../blog/post-catalog';
import { PostRow } from '../../blog/post-row/post-row';
import { Route } from '../../config/route';
import { ArrowLink } from '../../shared/components/arrow-link/arrow-link';

const POST_COUNT_ON_HOME = 2;

@Component({
  selector: 'app-latest-posts',
  imports: [ArrowLink, PostRow, RouterLink, TranslocoDirective],
  templateUrl: './latest-posts.html',
})
export class LatestPosts {
  readonly blogLink = `/${Route.BLOG}`;
  readonly posts = BLOG_POSTS.slice(0, POST_COUNT_ON_HOME);
}
