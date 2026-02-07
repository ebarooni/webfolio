import { ChangeDetectionStrategy, Component, DOCUMENT, computed, effect, inject, untracked } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, distinctUntilChanged, shareReplay, startWith } from 'rxjs';

import { AppStore } from '../store/app/app.store';
import { CompactNavbarComponent } from '../components/compact-navbar/compact-navbar.component';
import { Footer } from './footer/footer';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { Theme } from '../config/constants/themes-array';
import { VERSION } from '../../environments/build-info';
import { Route } from '../config/constants/route';

type UiConfig = Readonly<{
  footerBgClass: string;
  page: Route;
}>;

const DEFAULT_UI_CONFIG: UiConfig = {
  footerBgClass: 'bg-base-200',
  page: Route.HOME,
};

@Component({
  selector: 'app-shell',
  imports: [NavbarComponent, CompactNavbarComponent, Footer, RouterOutlet],
  templateUrl: './app-shell.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShell {
  private readonly appStore = inject(AppStore);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);

  readonly version = `v${VERSION}`;

  private readonly uiConfig$ = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map(() => {
      let aRoute: ActivatedRoute = this.router.routerState.root;
      while (aRoute.firstChild) aRoute = aRoute.firstChild;

      const data = aRoute.snapshot?.data;

      const footerBgClass =
        (data['footerBgClass'] as string | undefined) ?? DEFAULT_UI_CONFIG.footerBgClass;

      const page =
        (data['page'] as Route | undefined) ?? DEFAULT_UI_CONFIG.page;

      return { footerBgClass, page } satisfies UiConfig;
    }),
    distinctUntilChanged(
      (a, b) => a.footerBgClass === b.footerBgClass && a.page === b.page
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly uiConfig = toSignal(this.uiConfig$, { initialValue: DEFAULT_UI_CONFIG });

  readonly theme = toSignal(this.appStore.selectTheme$, {
    initialValue: 'light' as Theme,
  });

  readonly shellClass = computed(() => 'min-h-screen w-full flex flex-col bg-base-100');

  constructor() {
    effect(() => {
      const theme = this.theme();
      untracked(() => {
        this.document.documentElement.setAttribute('data-theme', theme);
      });
    });
  }

  themeChanged(theme: Theme): void {
    this.appStore.updateTheme(theme);
  }
}
