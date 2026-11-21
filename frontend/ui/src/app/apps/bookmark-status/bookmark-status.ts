import { Component, inject } from '@angular/core';

import { injectCopy } from '../../localization/localized-copy';
import { AppStore } from '../../store/app/app.store';
import { BookmarkStatusBento } from './bento/bento';
import { BookmarkStatusCallToAction } from './call-to-action/call-to-action';
import { BookmarkStatusFaq } from './faq/faq';
import { BookmarkStatusHero } from './hero/hero';
import { BookmarkStatusPrivacy } from './privacy/privacy';
import { BookmarkStatusSteps } from './steps/steps';
import { pageCopy } from './bookmark-status.copy';

/**
 * The page of the Bookmark Status app. The route gives the head tags from
 * bookmark-status.seo.ts (see app.routes.ts).
 */
@Component({
  selector: 'app-bookmark-status',
  imports: [
    BookmarkStatusHero,
    BookmarkStatusBento,
    BookmarkStatusSteps,
    BookmarkStatusPrivacy,
    BookmarkStatusFaq,
    BookmarkStatusCallToAction,
  ],
  templateUrl: './bookmark-status.html',
  styleUrl: './bookmark-status.css',
  host: {
    class: 'bookmark-status-page flex flex-1 flex-col',
  },
})
export class BookmarkStatusPage {
  private readonly appStore = inject(AppStore);

  readonly copy = injectCopy(pageCopy);
  readonly theme = this.appStore.theme;
}
