import {
  ApplicationConfig,
  isDevMode,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { IS_DEV_MODE } from './tokens/is-dev-mode';
import { initializeApp } from './initialize-app';
import { provideAppStore } from './store/app/app.store.provider';
import { provideHttpClient } from '@angular/common/http';
import { provideLogService } from './services/log/log.service.provider';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: IS_DEV_MODE, useValue: isDevMode() },
    provideAppInitializer(initializeApp),
    provideAppStore(),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideLogService(),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),
  ],
};
