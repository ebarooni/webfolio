import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { distinctUntilChanged, fromEvent, map, of, startWith } from 'rxjs';

import { Route } from '../../config/constants/route';
import { Theme } from '../../config/constants/themes-array';
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
  private readonly document = inject(DOCUMENT);
  private readonly window = this.document.defaultView;

  readonly selectedTheme = input.required<Theme>();
  readonly version = input<string | undefined>(undefined);
  readonly themeChanged = output<Theme>();

  readonly themeSelectorModalComponent =
    viewChild<ThemeSelectorModal>('themeSelectorModal');

  readonly isMenuOpen = signal(false);

  readonly Route = Route;
  readonly navItems: readonly NavItem[] = [
    { label: 'Home', route: Route.HOME, exact: true },
    { label: 'Blog', route: Route.BLOG },
    { label: 'Projects', route: Route.PROJECTS },
    { label: 'Contact', route: Route.CONTACT },
    { label: 'Build', route: Route.BUILD_INFO, requiresVersion: true },
  ] as const;

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
    fromEvent<KeyboardEvent>(this.document, 'keydown')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (event.key === 'Escape' && this.isMenuOpen()) {
          this.closeMenu();
        }
      });
  }

  toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
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
