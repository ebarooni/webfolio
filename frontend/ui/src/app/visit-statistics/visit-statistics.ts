import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DestroyRef, inject, InjectionToken, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs';

import { ANALYTICS, AnalyticsConfig } from '../config/analytics';

export const ANALYTICS_CONFIG = new InjectionToken<AnalyticsConfig>(
  'ANALYTICS_CONFIG',
  { factory: () => ANALYTICS },
);

const SCRIPT_ID = 'visit-statistics';

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
  // A visitor who asks not to be tracked is not counted.
  script.dataset['doNotTrack'] = 'true';
  // Query strings and fragments can hold personal data, such as a
  // search or a prefilled field. Only the path is counted.
  script.dataset['excludeSearch'] = 'true';
  script.dataset['excludeHash'] = 'true';

  return script;
}

/**
 * Loads the visit statistics tracker in the browser once the first
 * navigation ended, so the first view is counted with its final path
 * after any redirect. Every page counts, the access screen too: it always
 * has the path /access-denied, whatever the language. The tracker then
 * counts each page change itself, including the language prefixes /de
 * and /nl.
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

  const subscription = inject(Router)
    .events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      take(1),
    )
    .subscribe(() => {
      if (!documentRef.getElementById(SCRIPT_ID)) {
        documentRef.head.appendChild(createTrackerScript(documentRef, config));
      }
    });

  inject(DestroyRef).onDestroy(() => subscription.unsubscribe());
}
