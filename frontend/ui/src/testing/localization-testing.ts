import { ModuleWithProviders } from '@angular/core';
import {
  TranslocoTestingModule,
  TranslocoTestingOptions,
} from '@jsverse/transloco';

import german from '@localizations/de.json';
import english from '@localizations/en.json';

import { DEFAULT_LANGUAGE, languages } from '../app/config/languages';

export const englishTranslation = english;
export const germanTranslation = german;

export function localizationTestingModule(
  options: TranslocoTestingOptions = {},
): ModuleWithProviders<TranslocoTestingModule> {
  return TranslocoTestingModule.forRoot({
    langs: { de: german, en: english },
    preloadLangs: true,
    translocoConfig: {
      availableLangs: [...languages],
      defaultLang: DEFAULT_LANGUAGE,
      reRenderOnLangChange: true,
    },
    ...options,
  });
}
