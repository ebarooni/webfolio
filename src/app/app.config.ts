import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideLogService } from './services/log/log.service.provider';
import { IS_DEV_MODE } from './tokens/is-dev-mode';
import { provideAppStore } from './store/app/app.store.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideLogService(),
    { provide: IS_DEV_MODE, useValue: isDevMode() },
    provideAppStore(),
  ],
};
