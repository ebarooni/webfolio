// compact-navbar.component.ts

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
import { RouterLink, RouterLinkActive } from '@angular/router';
import { fromEvent } from 'rxjs';
import { auditTime, startWith } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Theme, themesArray } from '../../config/constants/themes-array';
import { Route } from '../../config/constants/route';
import { ThemeSelectorModal } from './theme-selector-modal/theme-selector-modal';

type NavItem = Readonly<{
  label: string;
  route: Route;
  exact?: boolean;
  requiresVersion?: boolean;
}>;

@Component({
  selector: 'app-compact-navbar',
  imports: [RouterLink, RouterLinkActive, ThemeSelectorModal],
  templateUrl: './compact-navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompactNavbar {
  private readonly destroyRef = inject(DestroyRef);

  readonly selectedTheme = input.required<Theme>();
  readonly version = input<string | undefined>(undefined);
  readonly themeChanged = output<Theme>();

  readonly navbarDiv = viewChild<ElementRef<HTMLDivElement>>('navbarDiv');
  readonly themeSelectorModalComponent =
    viewChild<ThemeSelectorModal>('themeSelectorModal');

  readonly isMenuOpen = signal(false);

  readonly themes = themesArray;
  readonly Route = Route;

  readonly navItems: readonly NavItem[] = [
    { label: 'Home', route: Route.HOME, exact: true },
    { label: 'Blog', route: Route.BLOG },
    { label: 'Projects', route: Route.PROJECTS },
    { label: 'Contact', route: Route.CONTACT },
    { label: 'Build', route: Route.BUILD_INFO, requiresVersion: true },
  ] as const;

  constructor() {
    fromEvent(window, 'scroll')
      .pipe(startWith(null), auditTime(50), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const el = this.navbarDiv()?.nativeElement;
        if (!el) return;
        el.classList.toggle('shadow-xs', window.scrollY > 0);
      });
  }

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  openThemeSelector(): void {
    this.themeSelectorModalComponent()?.showModal();
  }

  onThemeChanged(theme: Theme): void {
    this.themeChanged.emit(theme);
  }
}