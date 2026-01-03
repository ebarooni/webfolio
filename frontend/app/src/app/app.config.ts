import {
  ApplicationConfig,
  isDevMode,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { IS_DEV_MODE } from './tokens/is-dev-mode';
import { initializeApp } from './initialize-app';
import { provideAppStore } from './store/app/app.store.provider';
import { provideFirebaseService } from './services/firebase/firebase.service.provider';
import { provideLogService } from './services/log/log.service.provider';
import { routes } from './app.routes';

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
    provideFirebaseService(),
  ],
};
