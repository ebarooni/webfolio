import { booleanAttribute, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import { Route } from '../../config/route';
import { injectActiveLanguage } from '../../localization/active-language';
import { ShortDate } from '../../shared/short-date/short-date';
import { type BlogPostPreview } from '../post-catalog';
import { postTitleTransitionName } from '../post-title-transition';

/**
 * One post in a list of posts. The blog page shows the summary. The home
 * screen shows only the title, thus its list stays short.
 */
@Component({
  selector: 'app-post-row',
  imports: [RouterLink, ShortDate, TranslocoDirective],
  templateUrl: './post-row.html',
})
export class PostRow {
  readonly post = input.required<BlogPostPreview>();
  readonly headingLevel = input<2 | 3>(3);
  readonly showSummary = input(false, { transform: booleanAttribute });

  readonly language = injectActiveLanguage();
  readonly link = computed(() => ['/', Route.BLOG, this.post().slug]);
  readonly transitionName = computed(() =>
    postTitleTransitionName(this.post().slug),
  );
}
