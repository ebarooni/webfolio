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
import { fixedHeaderScrollOffset } from './fixed-header-scroll-offset';
import { initializeApp } from './initialize-app';

function registerFixedHeaderScrollOffset(): void {
  const documentRef = inject(DOCUMENT);
  const scroller = inject(ViewportScroller);

  scroller.setOffset(() => fixedHeaderScrollOffset(documentRef));
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(initializeApp),
    provideAppInitializer(registerFixedHeaderScrollOffset),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
  ],
};
