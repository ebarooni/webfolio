import { Component } from '@angular/core';

import { CapacitorCalendarCallToAction } from './call-to-action/call-to-action';
import { CapacitorCalendarFaq } from './faq/faq';
import { CapacitorCalendarHero } from './hero/hero';
import { CapacitorCalendarQuickStart } from './quick-start/quick-start';
import { CapacitorCalendarResources } from './resources/resources';

/**
 * The landing page of the Capacitor Calendar plugin. The build prerenders
 * it (see app.routes.server.ts), so search engines get the full text, the
 * meta tags and the JSON-LD without JavaScript. The route gives the head
 * tags from capacitor-calendar.seo.ts (see app.routes.ts).
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
    // The page text is English in every site language.
    lang: 'en',
  },
})
export class CapacitorCalendarPage {}
