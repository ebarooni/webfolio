import { Component, DestroyRef, inject } from '@angular/core';

import { PageSeo } from '../../shared/seo/page-seo';
import { CapacitorCalendarApiOverview } from './api-overview/api-overview';
import { CapacitorCalendarCallToAction } from './call-to-action/call-to-action';
import { PAGE_SEO } from './capacitor-calendar.seo';
import { CapacitorCalendarFaq } from './faq/faq';
import { CapacitorCalendarFeatures } from './features/features';
import { CapacitorCalendarHero } from './hero/hero';
import { CapacitorCalendarPlatforms } from './platforms/platforms';
import { CapacitorCalendarQuickStart } from './quick-start/quick-start';
import { CapacitorCalendarWhy } from './why/why';

/**
 * The landing page of the Capacitor Calendar plugin. The build prerenders
 * it (see app.routes.server.ts), so search engines get the full text, the
 * meta tags and the JSON-LD without JavaScript.
 */
@Component({
  selector: 'app-capacitor-calendar',
  imports: [
    CapacitorCalendarApiOverview,
    CapacitorCalendarCallToAction,
    CapacitorCalendarFaq,
    CapacitorCalendarFeatures,
    CapacitorCalendarHero,
    CapacitorCalendarPlatforms,
    CapacitorCalendarQuickStart,
    CapacitorCalendarWhy,
  ],
  templateUrl: './capacitor-calendar.html',
  styleUrl: './capacitor-calendar.css',
  host: {
    class: 'flex flex-1 flex-col',
  },
})
export class CapacitorCalendarPage {
  constructor() {
    inject(PageSeo).apply(PAGE_SEO, inject(DestroyRef));
  }
}
