import { inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from 'rxjs';

import { AppStore } from './store/app/app.store';

export async function initializeApp(): Promise<void> {
  const appStore = inject(AppStore);
  const translocoService = inject(TranslocoService);

  try {
    const { language, theme } = appStore.initialize();
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('lang', language);
    translocoService.setActiveLang(language);

    // The first screen must not show translation keys.
    await firstValueFrom(translocoService.load(language));
  } catch (error) {
    console.debug(error);
  }
}
