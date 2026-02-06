import {
  Component,
  DOCUMENT,
  computed,
  effect,
  inject,
} from '@angular/core';
import { AppStore } from '../store/app/app.store';
import { CompactNavbarComponent } from '../components/compact-navbar/compact-navbar.component';
import { Footer } from '../components/footer/footer';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { Theme } from '../config/constants/themes-array';
import { VERSION } from '../../environments/build-info';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { ShellVariant } from '../config/constants/shell-variant';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [
    NavbarComponent,
    CompactNavbarComponent,
    Footer,
    RouterOutlet
],
  selector: 'app-shell',
  templateUrl: './app-shell.html',
})
export class AppShell {
  private readonly appStore = inject(AppStore);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly version = `v${VERSION}`;

  private readonly variant$ = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map(() => {
      let aRoute: ActivatedRoute = this.route;
      while (aRoute.firstChild) {
        aRoute = aRoute.firstChild;
      }
      
      return (aRoute.snapshot.data['shellVariant'] as ShellVariant | undefined) ?? 'default';
    }),
  );

  readonly variant = toSignal(this.variant$, { initialValue: 'default' as ShellVariant });

  readonly theme = toSignal(this.appStore.selectTheme$, {
    initialValue: 'light' as Theme,
  });

  readonly shellClass = computed(() => {
    switch (this.variant()) {
      case 'plain':
      case 'default':
      default:
        return 'min-h-screen w-full flex flex-col bg-base-100';
    }
  });

  constructor() {
    effect(() => {
      this.document.documentElement.setAttribute('data-theme', this.theme());
    });
  }

  themeChanged(theme: Theme): void {
    this.appStore.updateTheme(theme);
  }
}
