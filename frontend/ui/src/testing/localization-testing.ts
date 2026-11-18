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

type PostText = Readonly<{ title: string; summary: string }>;

/** The translated title and summary of a blog post. */
export function postText(
  slug: string,
  translation: typeof english | typeof german = english,
): PostText {
  const posts: Readonly<Record<string, PostText>> = translation.blog.posts;

  return posts[slug];
}
