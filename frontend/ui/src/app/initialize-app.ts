import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, inject, PLATFORM_ID } from '@angular/core';
import { AppStore } from './store/app/app.store';

export function initializeApp(): void {
  const appStore = inject(AppStore);
  const documentRef = inject(DOCUMENT);

  // A prerendered page has no stored state. It uses the default theme, and
  // the browser applies the stored theme when the app starts. The address
  // sets the language of the page (see activateLanguage).
  if (!isPlatformBrowser(inject(PLATFORM_ID))) {
    return;
  }

  try {
    const { theme } = appStore.initialize();
    documentRef.documentElement.setAttribute('data-theme', theme);
  } catch (error) {
    console.debug(error);
  }
}
