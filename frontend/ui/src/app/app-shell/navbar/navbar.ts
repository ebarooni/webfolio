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
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { fromEvent } from 'rxjs';
import { auditTime, filter, startWith } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { DataThemeDirective } from '../../directives/data-theme/data-theme.directive';
import { Theme, themesArray } from '../../config/constants/themes-array';
import { Route } from '../../config/constants/route';

type NavItem = Readonly<{
  label: string;
  route: Route;
  exact?: boolean;
}>;

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, DataThemeDirective, NgClass],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  private readonly destroyRef = inject(DestroyRef);

  readonly selectedTheme = input.required<Theme>();
  readonly version = input<string | undefined>(undefined);
  readonly themeChanged = output<Theme>();

  readonly navbarDiv = viewChild<ElementRef<HTMLDivElement>>('navbarDiv');
  readonly themeDropdown = viewChild<ElementRef<HTMLDivElement>>('themeDropdown');

  readonly themes = themesArray;
  readonly Route = Route;

  readonly navItems: readonly NavItem[] = [
    { label: 'Home', route: Route.HOME, exact: true },
    { label: 'Blog', route: Route.BLOG },
    { label: 'Projects', route: Route.PROJECTS },
    { label: 'Contact', route: Route.CONTACT },
  ] as const;

  readonly isThemeMenuOpen = signal(false);

  constructor() {
    fromEvent(window, 'scroll')
      .pipe(startWith(null), auditTime(50), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const element = this.navbarDiv()?.nativeElement;
        if (!element) {
          return;
        }

        element.classList.toggle('shadow-xs', window.scrollY > 0);
      });

    fromEvent<PointerEvent>(document, 'pointerdown')
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
    this.isThemeMenuOpen.update((open) => !open);
  }

  closeThemeMenu(): void {
    this.isThemeMenuOpen.set(false);
  }

  selectTheme(theme: Theme): void {
    this.themeChanged.emit(theme);
    this.closeThemeMenu();
  }
}
