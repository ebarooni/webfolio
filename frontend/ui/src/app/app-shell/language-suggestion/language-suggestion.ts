import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  Component,
  computed,
  inject,
  input,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import { Language } from '../../config/languages';
import { localizePath } from '../../localization/localized-path';
import { injectPagePath } from '../../localization/page-path';
import { SiteLanguage } from '../../localization/site-language';
import { AppStore } from '../../store/app/app.store';

type Suggestion = Readonly<{ language: Language; link: string }>;

/**
 * Offers the page in the language that the visitor chose before, or in the
 * browser language on a first visit. The site never changes the language
 * of an address by itself, because search engines and shared links must
 * get the page that the address names. The text is in the suggested
 * language, because the visitor may not read the language of the page.
 */
@Component({
  selector: 'app-language-suggestion',
  imports: [RouterLink, TranslocoDirective],
  templateUrl: './language-suggestion.html',
  styleUrl: './language-suggestion.css',
})
export class LanguageSuggestion {
  private readonly appStore = inject(AppStore);
  private readonly siteLanguage = inject(SiteLanguage);
  private readonly pagePath = injectPagePath();

  // The prerendered HTML has no suggestion, because it does not know the
  // visitor. The browser adds it after the start, so hydration matches.
  private readonly isStarted = signal(false);

  /** False on a page that exists in no language, such as "not found". */
  readonly pageExists = input(true);

  readonly suggestion = computed<Suggestion | null>(() => {
    const preferred = this.appStore.language();

    if (
      !this.isStarted() ||
      !this.pageExists() ||
      this.appStore.languageSuggestionDismissed() ||
      preferred === this.siteLanguage.current()
    ) {
      return null;
    }

    return {
      language: preferred,
      link: localizePath(this.pagePath(), preferred),
    };
  });

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      afterNextRender(() => {
        this.isStarted.set(true);
      });
    }
  }

  dismiss(): void {
    this.appStore.dismissLanguageSuggestion();
  }
}
