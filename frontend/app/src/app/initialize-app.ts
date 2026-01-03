import { AppStore } from './store/app/app.store';
import { FirebaseService } from './services/firebase/firebase.service';
import { LogService } from './services/log/log.service';
import { inject } from '@angular/core';

export function initializeApp() {
  const appStore = inject(AppStore);
  const logService = inject(LogService);
  const firebase = inject(FirebaseService);

  try {
    firebase.initializeApp();
  } catch (error: unknown) {
    logService.log(error, 'Failed to initialize firebase project.');
  }

  return appStore
    .initialize()
    .then(({ theme }) => {
      document.documentElement.setAttribute('data-theme', theme);
    })
    .catch((error: unknown) => {
      logService.log(error, 'Failed to initialize app.');
    });
}
