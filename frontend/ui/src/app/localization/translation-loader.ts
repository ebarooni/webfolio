import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';

import { DEFAULT_LANGUAGE, isLanguage, Language } from '../config/languages';

type TranslationModule = Readonly<{ default: Translation }>;

// The files live in the Maven module resources/localizations.
// A dynamic import gives each language its own hashed chunk.
const TRANSLATION_IMPORTS: Readonly<
  Record<Language, () => Promise<TranslationModule>>
> = {
  de: () => import('@localizations/de.json'),
  en: () => import('@localizations/en.json'),
};

@Injectable({ providedIn: 'root' })
export class TranslationLoader implements TranslocoLoader {
  async getTranslation(language: string): Promise<Translation> {
    const knownLanguage = isLanguage(language) ? language : DEFAULT_LANGUAGE;
    const translationModule = await TRANSLATION_IMPORTS[knownLanguage]();

    return translationModule.default;
  }
}
