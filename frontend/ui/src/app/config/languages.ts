export type Language = 'en' | 'de' | 'nl';

export const DEFAULT_LANGUAGE: Language = 'en';

export const languages: readonly Language[] = ['en', 'de', 'nl'];

/** The name of each language in that language, for the language menu. */
export const LANGUAGE_NAMES: Readonly<Record<Language, string>> = {
  de: 'Deutsch',
  en: 'English',
  nl: 'Nederlands',
};

export function isLanguage(value: unknown): value is Language {
  return languages.includes(value as Language);
}

export function detectLanguage(preferredLocales: readonly string[]): Language {
  for (const locale of preferredLocales) {
    const languageCode = locale.toLowerCase().split('-')[0];

    if (isLanguage(languageCode)) {
      return languageCode;
    }
  }

  return DEFAULT_LANGUAGE;
}
