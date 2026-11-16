import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';

import { BLOG_POSTS } from '../../blog/post-catalog';
import { Route } from '../../config/route';
import { ArrowIcon } from '../../shared/components/arrow-icon/arrow-icon';
import { ShortDate } from '../../shared/short-date/short-date';

const POST_COUNT_ON_HOME = 2;

@Component({
  selector: 'app-latest-posts',
  imports: [ArrowIcon, RouterLink, ShortDate, TranslocoDirective],
  templateUrl: './latest-posts.html',
})
export class LatestPosts {
  private readonly translocoService = inject(TranslocoService);

  readonly language = toSignal(this.translocoService.langChanges$, {
    initialValue: this.translocoService.getActiveLang(),
  });

  readonly blogLink = `/${Route.BLOG}`;
  readonly posts = BLOG_POSTS.slice(0, POST_COUNT_ON_HOME);
}
