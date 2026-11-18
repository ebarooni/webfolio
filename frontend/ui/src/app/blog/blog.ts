import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

import { PageHeader } from '../shared/components/page-header/page-header';
import { BLOG_POSTS } from './post-catalog';
import { PostRow } from './post-row/post-row';

@Component({
  selector: 'app-blog',
  imports: [PageHeader, PostRow, TranslocoDirective],
  templateUrl: './blog.html',
})
export class BlogComponent {
  readonly posts = BLOG_POSTS;
}
