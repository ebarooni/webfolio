import { Component, DOCUMENT, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { distinctUntilChanged, filter, map, merge, of } from 'rxjs';

import { TranslocoService } from '@jsverse/transloco';

import { BUILD_INFO } from '../../environments/build-info';
import { Language } from '../config/languages';
import { Route } from '../config/route';
import { Theme } from '../config/themes-array';
import { AppStore } from '../store/app/app.store';
import { Footer } from './footer/footer';
import { Navbar } from './navbar/navbar';

type UiConfig = Readonly<{
  footerBgClass: string;
  page: Route;
}>;

const DEFAULT_UI_CONFIG: UiConfig = {
  footerBgClass: 'bg-base-100',
  page: Route.HOME,
};

@Component({
  selector: 'app-shell',
  imports: [Navbar, Footer, RouterOutlet],
  templateUrl: './app-shell.html',
  /*
   * The main element grows to fill the screen, so the footer is never
   * above the bottom edge on short pages. The footer is outside main
   * because only then is it the page's contentinfo landmark.
   */
  host: {
    class: 'flex min-h-dvh w-full flex-col bg-base-100',
  },
})
export class AppShell {
  private readonly appStore = inject(AppStore);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly translocoService = inject(TranslocoService);

  readonly version = `v${BUILD_INFO.version}`;

  readonly theme = this.appStore.theme;
  readonly language = this.appStore.language;
  readonly developerMode = this.appStore.developerMode;

  readonly uiConfig = toSignal(
    merge(
      of(this.readUiConfig(this.router.routerState.snapshot.root)),
      this.router.events.pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
        map(() => this.readUiConfig(this.router.routerState.snapshot.root)),
      ),
    ).pipe(
      distinctUntilChanged(
        (previous, current) =>
          previous.footerBgClass === current.footerBgClass &&
          previous.page === current.page,
      ),
    ),
    {
      initialValue: DEFAULT_UI_CONFIG,
    },
  );

  constructor() {
    effect(() => {
      this.document.documentElement.setAttribute('data-theme', this.theme());
    });

    effect(() => {
      const language = this.language();

      this.document.documentElement.setAttribute('lang', language);
      this.translocoService.setActiveLang(language);
    });
  }

  languageChanged(language: Language): void {
    this.appStore.updateLanguage(language);
  }

  developerModeEnabled(): void {
    this.appStore.enableDeveloperMode();
    void this.router.navigate([Route.BUILD_INFO]);
  }

  themeChanged(theme: Theme): void {
    this.appStore.updateTheme(theme);
  }

  private readUiConfig(rootSnapshot: ActivatedRouteSnapshot): UiConfig {
    let currentSnapshot = rootSnapshot;

    while (currentSnapshot.firstChild) {
      currentSnapshot = currentSnapshot.firstChild;
    }

    const footerBgClass =
      (currentSnapshot.data['footerBgClass'] as string | undefined) ??
      DEFAULT_UI_CONFIG.footerBgClass;

    const page =
      (currentSnapshot.data['page'] as Route | undefined) ??
      DEFAULT_UI_CONFIG.page;

    return {
      footerBgClass,
      page,
    };
  }
}
