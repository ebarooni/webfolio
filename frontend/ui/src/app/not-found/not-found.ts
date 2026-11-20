import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import { Route } from '../config/route';
import { ArrowIcon } from '../shared/components/arrow-icon/arrow-icon';
import { ArrowLink } from '../shared/components/arrow-link/arrow-link';
import { Button } from '../shared/components/button/button';
import { PageIntro } from '../shared/components/page-intro/page-intro';

const ROBOTS_SELECTOR = 'name="robots"';

/**
 * Shows when no route matches the address. The server already answers
 * such addresses with status 404 where it can. The robots tag keeps
 * search engines from indexing the page when it cannot.
 */
@Component({
  selector: 'app-not-found',
  imports: [
    ArrowIcon,
    ArrowLink,
    Button,
    PageIntro,
    RouterLink,
    TranslocoDirective,
  ],
  templateUrl: './not-found.html',
})
export class NotFound implements OnInit, OnDestroy {
  private readonly meta = inject(Meta);

  readonly homeLink = `/${Route.HOME}`;
  readonly projectsLink = `/${Route.PROJECTS}`;
  readonly blogLink = `/${Route.BLOG}`;
  readonly contactLink = `/${Route.CONTACT}`;

  ngOnInit(): void {
    this.meta.updateTag(
      { name: 'robots', content: 'noindex' },
      ROBOTS_SELECTOR,
    );
  }

  ngOnDestroy(): void {
    this.meta.removeTag(ROBOTS_SELECTOR);
  }
}
