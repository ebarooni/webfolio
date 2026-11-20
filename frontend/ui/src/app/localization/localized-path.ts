import { DEFAULT_LANGUAGE, isLanguage, Language } from '../config/languages';

/**
 * English pages have no prefix, so the addresses from before the language
 * prefixes stay valid. German and Dutch pages start with "/de" and "/nl".
 */
export function localizePath(path: string, language: Language): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (language === DEFAULT_LANGUAGE) {
    return normalizedPath;
  }

  return normalizedPath === '/'
    ? `/${language}`
    : `/${language}${normalizedPath}`;
}

/** Gives the language of an address and the address without its prefix. */
export function splitLanguagePrefix(url: string): Readonly<{
  language: Language;
  path: string;
}> {
  const path = url.split(/[?#]/)[0] || '/';
  const [, firstSegment = '', ...rest] = path.split('/');

  if (firstSegment !== DEFAULT_LANGUAGE && isLanguage(firstSegment)) {
    return { language: firstSegment, path: `/${rest.join('/')}` };
  }

  return { language: DEFAULT_LANGUAGE, path };
}
