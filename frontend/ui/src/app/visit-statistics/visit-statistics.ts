import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DestroyRef, inject, InjectionToken, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs';

import { ANALYTICS, AnalyticsConfig } from '../config/analytics';
import { Route } from '../config/route';

export const ANALYTICS_CONFIG = new InjectionToken<AnalyticsConfig>(
  'ANALYTICS_CONFIG',
  { factory: () => ANALYTICS },
);

/** The global function that the tracker calls before it sends an event. */
export const BEFORE_SEND_NAME = 'webfolioBeforeVisitEvent';

const SCRIPT_ID = 'visit-statistics';

type VisitPayload = Readonly<{ url?: string }>;

/** True when the address is the access screen, in any form. */
export function isAccessScreen(url: string): boolean {
  const path = new URL(url, 'https://site.invalid').pathname;
  const firstSegment = path.split('/').find(Boolean);

  return firstSegment === String(Route.ACCESS_DENIED);
}

/**
 * Drops events of the access screen. The tracker loads only after a
 * page that is not the access screen opened. This also covers a later
 * navigation to it.
 */
export function beforeVisitEvent(
  _type: string,
  payload: VisitPayload | null | undefined,
): VisitPayload | null {
  if (!payload || (payload.url && isAccessScreen(payload.url))) {
    return null;
  }

  return payload;
}

function createTrackerScript(
  documentRef: Document,
  config: AnalyticsConfig,
): HTMLScriptElement {
  const script = documentRef.createElement('script');
  script.id = SCRIPT_ID;
  script.defer = true;
  script.src = config.scriptPath;
  script.dataset['websiteId'] = config.websiteId;
  // The site's own address. The tracker then sends to /insights/e there.
  script.dataset['hostUrl'] = `https://${config.host}`;
  script.dataset['domains'] = config.host;
  script.dataset['beforeSend'] = BEFORE_SEND_NAME;
  // A visitor who asks not to be tracked is not counted.
  script.dataset['doNotTrack'] = 'true';
  // Query strings and fragments can hold personal data, such as a
  // search or a prefilled field. Only the path is counted.
  script.dataset['excludeSearch'] = 'true';
  script.dataset['excludeHash'] = 'true';

  return script;
}

/**
 * Loads the visit statistics tracker in the browser, once the first page
 * that is not the access screen opened. A visitor who must stay on the
 * access screen therefore never loads it. The tracker then counts each
 * page change itself, including the language prefixes /de and /nl.
 */
export function startVisitStatistics(): void {
  if (!isPlatformBrowser(inject(PLATFORM_ID))) {
    return;
  }

  const config = inject(ANALYTICS_CONFIG);
  const documentRef = inject(DOCUMENT);
  const view = documentRef.defaultView;

  if (!config.websiteId || view?.location.hostname !== config.host) {
    return;
  }

  Object.assign(view, { [BEFORE_SEND_NAME]: beforeVisitEvent });

  const subscription = inject(Router)
    .events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      filter((event) => !isAccessScreen(event.urlAfterRedirects)),
      take(1),
    )
    .subscribe(() => {
      if (!documentRef.getElementById(SCRIPT_ID)) {
        documentRef.head.appendChild(createTrackerScript(documentRef, config));
      }
    });

  inject(DestroyRef).onDestroy(() => subscription.unsubscribe());
}
