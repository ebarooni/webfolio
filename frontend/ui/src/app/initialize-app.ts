import { AppStore } from './store/app/app.store';
import { LogService } from './services/log/log.service';
import { inject } from '@angular/core';

export async function initializeApp() {
  const appStore = inject(AppStore);
  const logService = inject(LogService);

  try {
    const { theme } = await appStore
      .initialize();
    document.documentElement.setAttribute('data-theme', theme);
  } catch (error) {
    logService.log(error, 'Failed to initialize app.');
  }
}
