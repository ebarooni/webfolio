import { DOCUMENT, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  of,
  startWith,
} from 'rxjs';

import { Route } from '../../config/constants/route';
import { Theme, themesArray } from '../../config/constants/themes-array';
import { DataTheme } from '../data-theme/data-theme';

type NavItem = Readonly<{
  label: string;
  route: Route;
  exact?: boolean;
}>;

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, DataTheme, NgClass],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly window = this.document.defaultView;

  readonly selectedTheme = input.required<Theme>();
  readonly version = input<string | undefined>(undefined);
  readonly themeChanged = output<Theme>();

  readonly themeDropdown =
    viewChild<ElementRef<HTMLDivElement>>('themeDropdown');

  readonly Route = Route;
  readonly themes = themesArray;
  readonly navItems: readonly NavItem[] = [
    { label: 'Home', route: Route.HOME, exact: true },
    { label: 'Blog', route: Route.BLOG },
    { label: 'Projects', route: Route.PROJECTS },
    { label: 'Contact', route: Route.CONTACT },
  ] as const;

  readonly isThemeMenuOpen = signal(false);

  readonly isScrolled = toSignal(
    this.window
      ? fromEvent(this.window, 'scroll').pipe(
          startWith(null),
          map(() => this.window!.scrollY > 0),
          distinctUntilChanged(),
        )
      : of(false),
    {
      initialValue: false,
    },
  );

  constructor() {
    fromEvent<PointerEvent>(this.document, 'pointerdown')
      .pipe(
        filter(() => this.isThemeMenuOpen()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        const dropdownElement = this.themeDropdown()?.nativeElement;
        const targetNode = event.target as Node | null;

        if (!dropdownElement || !targetNode) {
          return;
        }

        if (!dropdownElement.contains(targetNode)) {
          this.closeThemeMenu();
        }
      });
  }

  toggleThemeMenu(): void {
    this.isThemeMenuOpen.update((isOpen) => !isOpen);
  }

  closeThemeMenu(): void {
    this.isThemeMenuOpen.set(false);
  }

  selectTheme(theme: Theme): void {
    this.themeChanged.emit(theme);
    this.closeThemeMenu();
  }
}
