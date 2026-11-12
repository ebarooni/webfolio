import { EnvironmentProviders, isDevMode, Provider } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';

import { DEFAULT_LANGUAGE, languages } from '../config/languages';
import { TranslationLoader } from './translation-loader';

export function provideLocalization(): (Provider | EnvironmentProviders)[] {
  return provideTransloco({
    config: {
      availableLangs: [...languages],
      defaultLang: DEFAULT_LANGUAGE,
      fallbackLang: DEFAULT_LANGUAGE,
      missingHandler: {
        useFallbackTranslation: true,
      },
      prodMode: !isDevMode(),
      reRenderOnLangChange: true,
    },
    loader: TranslationLoader,
  });
}
