import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, inject, PLATFORM_ID } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from 'rxjs';

import { DEFAULT_LANGUAGE } from './config/languages';
import { AppStore } from './store/app/app.store';

export async function initializeApp(): Promise<void> {
  const appStore = inject(AppStore);
  const translocoService = inject(TranslocoService);
  const documentRef = inject(DOCUMENT);

  // A prerendered page has no stored state. It uses the defaults, and the
  // browser applies the stored theme and language when the app starts.
  if (!isPlatformBrowser(inject(PLATFORM_ID))) {
    await firstValueFrom(translocoService.load(DEFAULT_LANGUAGE));
    return;
  }

  try {
    const { language, theme } = appStore.initialize();
    documentRef.documentElement.setAttribute('data-theme', theme);
    documentRef.documentElement.setAttribute('lang', language);
    translocoService.setActiveLang(language);

    // The first screen must not show translation keys.
    await firstValueFrom(translocoService.load(language));
  } catch (error) {
    console.debug(error);
  }
}
