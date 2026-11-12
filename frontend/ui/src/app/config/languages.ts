export type Language = 'en' | 'de';

export const DEFAULT_LANGUAGE: Language = 'en';

export const languages: readonly Language[] = ['en', 'de'];

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
