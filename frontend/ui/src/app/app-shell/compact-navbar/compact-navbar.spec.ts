import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Route } from '../../config/route';
import { themesArray } from '../../config/themes-array';
import { CompactNavbar } from './compact-navbar';
import { ThemeSelectorModal } from './theme-selector-modal/theme-selector-modal';

describe('CompactNavbar', () => {
  let fixture: ComponentFixture<CompactNavbar>;
  let component: CompactNavbar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompactNavbar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CompactNavbar);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('selectedTheme', themesArray[0]);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render navigation items without build item when version is undefined', () => {
    const linkDebugElements = fixture.debugElement.queryAll(
      By.css('#compact-nav-menu a'),
    );
    const linkTexts = linkDebugElements.map((debugElement) => {
      const anchor = debugElement.nativeElement as HTMLAnchorElement;
      return anchor.textContent?.trim();
    });

    expect(linkTexts).toEqual(['Home', 'Blog', 'Projects', 'Contact']);
  });

  it('should render build item with version when version is set', () => {
    fixture.componentRef.setInput('version', 'v1.2.3');
    fixture.detectChanges();

    const linkDebugElements = fixture.debugElement.queryAll(
      By.css('#compact-nav-menu a'),
    );
    const linkTexts = linkDebugElements.map((debugElement) => {
      const anchor = debugElement.nativeElement as HTMLAnchorElement;
      return anchor.textContent?.trim();
    });

    expect(linkTexts).toEqual([
      'Home',
      'Blog',
      'Projects',
      'Contact',
      'v1.2.3',
    ]);
  });

  it('should toggle menu when toggle button is clicked', () => {
    const toggleButtonDebugElement = fixture.debugElement.query(
      By.css('button[aria-label="Toggle menu"]'),
    );
    const toggleButton =
      toggleButtonDebugElement.nativeElement as HTMLButtonElement;

    expect(component.isMenuOpen()).toBe(false);
    expect(toggleButton.getAttribute('aria-expanded')).toBe('false');

    toggleButton.click();
    fixture.detectChanges();

    expect(component.isMenuOpen()).toBe(true);
    expect(toggleButton.getAttribute('aria-expanded')).toBe('true');

    toggleButton.click();
    fixture.detectChanges();

    expect(component.isMenuOpen()).toBe(false);
    expect(toggleButton.getAttribute('aria-expanded')).toBe('false');
  });

  it('should close menu when a navigation link is clicked', () => {
    component.isMenuOpen.set(true);
    fixture.detectChanges();

    const linkDebugElement = fixture.debugElement.query(
      By.css('#compact-nav-menu a'),
    );
    const anchor = linkDebugElement.nativeElement as HTMLAnchorElement;

    anchor.click();
    fixture.detectChanges();

    expect(component.isMenuOpen()).toBe(false);
  });

  it('should close menu on Escape key press when menu is open', () => {
    component.isMenuOpen.set(true);
    fixture.detectChanges();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(component.isMenuOpen()).toBe(false);
  });

  it('should not close menu on Escape key press when menu is already closed', () => {
    component.isMenuOpen.set(false);
    fixture.detectChanges();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(component.isMenuOpen()).toBe(false);
  });

  it('should open theme selector when theme button is clicked', () => {
    const modalComponent = component.themeSelectorModalComponent();

    expect(modalComponent).toBeTruthy();

    if (!modalComponent) {
      throw new Error('Expected theme selector modal component to exist.');
    }

    const showModalSpy = vi
      .spyOn(modalComponent, 'showModal')
      .mockImplementation(() => undefined);

    const buttonDebugElements = fixture.debugElement.queryAll(
      By.css('nav button'),
    );
    const themeButtonDebugElement = buttonDebugElements[0];
    const themeButton =
      themeButtonDebugElement.nativeElement as HTMLButtonElement;

    themeButton.click();

    expect(showModalSpy).toHaveBeenCalled();
  });

  it('should emit themeChanged when onThemeChanged is called', () => {
    const emitSpy = vi.spyOn(component.themeChanged, 'emit');

    component.onThemeChanged(themesArray[1]);

    expect(emitSpy).toHaveBeenCalledWith(themesArray[1]);
  });

  it('should expose the expected navigation configuration', () => {
    expect(component.navItems).toEqual([
      { label: 'Home', route: Route.HOME, exact: true },
      { label: 'Blog', route: Route.BLOG },
      { label: 'Projects', route: Route.PROJECTS },
      { label: 'Contact', route: Route.CONTACT },
      { label: 'Build', route: Route.BUILD_INFO, requiresVersion: true },
    ]);
  });

  it('should render the theme selector modal with the selected theme input', () => {
    const modalDebugElement = fixture.debugElement.query(
      By.directive(ThemeSelectorModal),
    );

    expect(modalDebugElement).toBeTruthy();

    const modalComponent =
      modalDebugElement.componentInstance as ThemeSelectorModal;

    expect(modalComponent.selectedTheme()).toBe(themesArray[0]);
  });
});
