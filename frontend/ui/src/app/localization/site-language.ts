import { DOCUMENT, inject, Injectable, Injector, signal } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from 'rxjs';

import { DEFAULT_LANGUAGE, isLanguage, Language } from '../config/languages';

/** The key of the route data that holds the language of a page. */
export const LANGUAGE_DATA_KEY = 'language';

/**
 * The language of the page on the screen. The address sets it (see
 * activateLanguage). The language that a visitor chose before is only a
 * suggestion, see LanguageSuggestion.
 */
@Injectable({ providedIn: 'root' })
export class SiteLanguage {
  // Links read the language too. They must work without Transloco.
  private readonly injector = inject(Injector);
  private readonly document = inject(DOCUMENT);
  private readonly language = signal<Language>(DEFAULT_LANGUAGE);

  readonly current = this.language.asReadonly();

  async activate(language: Language): Promise<void> {
    const translocoService = this.injector.get(TranslocoService);

    // The page must not show translation keys, also in the static HTML.
    // English fills the gaps of a missing translation.
    await Promise.all(
      [...new Set([DEFAULT_LANGUAGE, language])].map((code) =>
        firstValueFrom(translocoService.load(code)),
      ),
    );

    translocoService.setActiveLang(language);
    this.document.documentElement.setAttribute('lang', language);
    this.language.set(language);
  }
}

/** Sets the language of all pages below the route before they open. */
export function activateLanguage(language: Language): CanActivateFn {
  return async () => {
    await inject(SiteLanguage).activate(language);
    return true;
  };
}

/** Gives the language of the page that a route snapshot belongs to. */
export function languageOfRoute(snapshot: ActivatedRouteSnapshot): Language {
  for (const route of [...snapshot.pathFromRoot].reverse()) {
    const language: unknown = route.data[LANGUAGE_DATA_KEY];

    if (isLanguage(language)) {
      return language;
    }
  }

  return DEFAULT_LANGUAGE;
}
