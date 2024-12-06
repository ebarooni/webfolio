import {
  ApplicationConfig,
  isDevMode,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideLogService } from './services/log/log.service.provider';
import { IS_DEV_MODE } from './tokens/is-dev-mode';
import { provideAppStore } from './store/app/app.store.provider';
import { initializeApp } from './initialize-app';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(initializeApp),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),
    provideLogService(),
    { provide: IS_DEV_MODE, useValue: isDevMode() },
    provideAppStore(),
  ],
};
