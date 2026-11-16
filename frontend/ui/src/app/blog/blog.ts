import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';

import { Route } from '../config/route';
import { PageHeader } from '../shared/components/page-header/page-header';
import { ShortDate } from '../shared/short-date/short-date';
import { BLOG_POSTS } from './post-catalog';

@Component({
  selector: 'app-blog',
  imports: [PageHeader, RouterLink, ShortDate, TranslocoDirective],
  templateUrl: './blog.html',
})
export class BlogComponent {
  private readonly translocoService = inject(TranslocoService);

  readonly language = toSignal(this.translocoService.langChanges$, {
    initialValue: this.translocoService.getActiveLang(),
  });

  readonly blogLink = `/${Route.BLOG}`;
  readonly posts = BLOG_POSTS;
}
