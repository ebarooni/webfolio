import { AppStore } from './store/app/app.store';
import { Log } from './log/log';
import { inject } from '@angular/core';

export async function initializeApp() {
  const appStore = inject(AppStore);
  const log = inject(Log);

  try {
    const { theme } = await appStore
      .initialize();
    document.documentElement.setAttribute('data-theme', theme);
  } catch (error) {
    log.debug(error as Error);
  }
}
