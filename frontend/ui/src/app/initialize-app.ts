import { AppStore } from './store/app/app.store';
import { Log } from './log/log';
import { inject } from '@angular/core';

export function initializeApp() {
  const appStore = inject(AppStore);
  const log = inject(Log);

  try {
    const { theme } = appStore.initialize();
    document.documentElement.setAttribute('data-theme', theme);
  } catch (error) {
    log.debug(error as Error);
  }
}
