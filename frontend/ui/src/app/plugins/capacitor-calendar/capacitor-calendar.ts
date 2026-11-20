import { Component, DestroyRef, inject } from '@angular/core';

import { PageSeo } from '../../shared/seo/page-seo';
import { CapacitorCalendarCallToAction } from './call-to-action/call-to-action';
import { PAGE_SEO } from './capacitor-calendar.seo';
import { CapacitorCalendarFaq } from './faq/faq';
import { CapacitorCalendarHero } from './hero/hero';
import { CapacitorCalendarQuickStart } from './quick-start/quick-start';
import { CapacitorCalendarResources } from './resources/resources';

/**
 * The landing page of the Capacitor Calendar plugin. The build prerenders
 * it (see app.routes.server.ts), so search engines get the full text, the
 * meta tags and the JSON-LD without JavaScript.
 */
@Component({
  selector: 'app-capacitor-calendar',
  imports: [
    CapacitorCalendarCallToAction,
    CapacitorCalendarFaq,
    CapacitorCalendarHero,
    CapacitorCalendarQuickStart,
    CapacitorCalendarResources,
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
