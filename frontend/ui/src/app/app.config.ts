import { DOCUMENT, isPlatformBrowser, ViewportScroller } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  PLATFORM_ID,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideRouter,
  TitleStrategy,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { greetCuriousVisitors } from './easter-eggs/console-greeting';
import { fixedHeaderScrollOffset } from './fixed-header-scroll-offset';
import { initializeApp } from './initialize-app';
import { LocalizedTitleStrategy } from './localization/localized-title-strategy';
import { provideLocalization } from './localization/provide-localization';
import { skipUnwantedViewTransition } from './view-transition-filter';

function registerFixedHeaderScrollOffset(): void {
  const documentRef = inject(DOCUMENT);
  const scroller = inject(ViewportScroller);

  scroller.setOffset(() => fixedHeaderScrollOffset(documentRef));
}

// The prerender step runs in Node. Only a real visitor gets the greeting.
function greetInBrowser(): void {
  if (isPlatformBrowser(inject(PLATFORM_ID))) {
    greetCuriousVisitors();
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(initializeApp),
    provideAppInitializer(registerFixedHeaderScrollOffset),
    provideAppInitializer(greetInBrowser),
    provideBrowserGlobalErrorListeners(),
    // A prerendered page keeps its HTML when the app starts. Client-rendered
    // pages have no server markup, so hydration does nothing for them.
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideLocalization(),
    { provide: TitleStrategy, useClass: LocalizedTitleStrategy },
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      // Browsers without the View Transitions API navigate without animation.
      withViewTransitions({
        onViewTransitionCreated: skipUnwantedViewTransition,
        skipInitialTransition: true,
      }),
    ),
  ],
};
