import { DOCUMENT, ViewportScroller } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { greetCuriousVisitors } from './easter-eggs/console-greeting';
import { fixedHeaderScrollOffset } from './fixed-header-scroll-offset';
import { initializeApp } from './initialize-app';
import { provideLocalization } from './localization/provide-localization';

function registerFixedHeaderScrollOffset(): void {
  const documentRef = inject(DOCUMENT);
  const scroller = inject(ViewportScroller);

  scroller.setOffset(() => fixedHeaderScrollOffset(documentRef));
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(initializeApp),
    provideAppInitializer(registerFixedHeaderScrollOffset),
    provideAppInitializer(greetCuriousVisitors),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideLocalization(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
  ],
};
