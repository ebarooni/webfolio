import { AppStore } from './store/app/app.store';
import { inject } from '@angular/core';

export function initializeApp() {
  const appStore = inject(AppStore);

  try {
    const { theme } = appStore.initialize();
    document.documentElement.setAttribute('data-theme', theme);
  } catch (error) {
    console.debug(error as Error);
  }
}
