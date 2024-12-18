import { inject } from '@angular/core';
import { AppStore } from './store/app/app.store';
import { LogService } from './services/log/log.service';

export function initializeApp() {
  const appStore = inject(AppStore);
  const logService = inject(LogService);
  return appStore
    .initialize()
    .then(({ theme }) =>
      document.documentElement.setAttribute('data-theme', theme),
    )
    .catch((error) => logService.log(error, 'Failed to initialize app'));
}
