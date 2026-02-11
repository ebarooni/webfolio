import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Navbar } from './navbar';
import { Theme } from '../../config/constants/themes-array';
import { Route } from '../../config/constants/route';

@Component({
  standalone: true,
  template: '<div>dummy</div>',
})
class DummyRouteComponent {}

describe('Navbar', () => {
  let fixture: ComponentFixture<Navbar>;
  let component: Navbar;
  let router: Router;

  const configureTestingModule = async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        provideRouter([
          { path: Route.HOME, component: DummyRouteComponent },
          { path: Route.BLOG, component: DummyRouteComponent },
          { path: Route.PROJECTS, component: DummyRouteComponent },
          { path: Route.CONTACT, component: DummyRouteComponent },
          { path: Route.BUILD_INFO, component: DummyRouteComponent },
          { path: '', redirectTo: Route.HOME, pathMatch: 'full' },
        ]),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
  };

  const createComponent = async (options?: { selectedTheme?: Theme; version?: string }) => {
    await configureTestingModule();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('selectedTheme', options?.selectedTheme ?? ('light' as Theme));

    if (options?.version !== undefined) {
      fixture.componentRef.setInput('version', options.version);
    }

    fixture.detectChanges();
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', async () => {
    await createComponent();
    expect(component).toBeTruthy();
  });

  it('should throw if required selectedTheme input is not provided', async () => {
    await configureTestingModule();

    const navbarFixture = TestBed.createComponent(Navbar);

    expect(() => navbarFixture.detectChanges()).toThrow();
  });

  describe('navigation links', () => {
    it('should render the navigation items', async () => {
      await createComponent();

      const anchorTexts = fixture.debugElement
        .queryAll(By.css('nav a'))
        .map((de) => (de.nativeElement as HTMLAnchorElement).textContent?.trim())
        .filter(Boolean);

      expect(anchorTexts).toContain('Home');
      expect(anchorTexts).toContain('Blog');
      expect(anchorTexts).toContain('Projects');
      expect(anchorTexts).toContain('Contact');
    });

    it('should not render the version link when version input is undefined', async () => {
      await createComponent({ version: undefined });

      const anchorTexts = fixture.debugElement
        .queryAll(By.css('nav a'))
        .map((de) => (de.nativeElement as HTMLAnchorElement).textContent?.trim())
        .filter(Boolean);

      expect(anchorTexts).not.toContain('v1.2.3');
    });

    it('should render the version link when version input is provided', async () => {
      await createComponent({ version: 'v1.2.3' });

      const anchorTexts = fixture.debugElement
        .queryAll(By.css('nav a'))
        .map((de) => (de.nativeElement as HTMLAnchorElement).textContent?.trim())
        .filter(Boolean);

      expect(anchorTexts).toContain('v1.2.3');
    });

    it('should apply routerLinkActive classes to the active route', fakeAsync(async () => {
      await createComponent();

      router.navigateByUrl(`/${Route.HOME}`);
      tick();
      fixture.detectChanges();

      const homeAnchor = fixture.debugElement
        .queryAll(By.css('nav a'))
        .map((de) => de.nativeElement as HTMLAnchorElement)
        .find((a) => a.textContent?.trim() === 'Home');

      expect(homeAnchor).toBeTruthy();
      expect(homeAnchor!.className).toContain('btn-active');

      router.navigateByUrl(`/${Route.CONTACT}`);
      tick();
      fixture.detectChanges();

      const contactAnchor = fixture.debugElement
        .queryAll(By.css('nav a'))
        .map((de) => de.nativeElement as HTMLAnchorElement)
        .find((a) => a.textContent?.trim() === 'Contact');

      expect(contactAnchor).toBeTruthy();
      expect(contactAnchor!.className).toContain('btn-active');
    }));
  });

  describe('theme dropdown behavior', () => {
    const getThemeToggleButton = () =>
      fixture.debugElement.query(By.css('button[aria-haspopup="menu"]')).nativeElement as HTMLButtonElement;

    it('should be closed by default', async () => {
      await createComponent();

      expect(component.isThemeMenuOpen()).toBe(false);
      expect(fixture.debugElement.query(By.css('[role="menu"]'))).toBeNull();
    });

    it('should open and close when clicking the Theme button', async () => {
      await createComponent();

      const themeButton = getThemeToggleButton();

      themeButton.click();
      fixture.detectChanges();

      expect(component.isThemeMenuOpen()).toBe(true);
      expect(fixture.debugElement.query(By.css('[role="menu"]'))).toBeTruthy();

      themeButton.click();
      fixture.detectChanges();

      expect(component.isThemeMenuOpen()).toBe(false);
      expect(fixture.debugElement.query(By.css('[role="menu"]'))).toBeNull();
    });

    it('should close on Escape keydown on the Theme button', async () => {
      await createComponent();

      const themeButton = getThemeToggleButton();
      themeButton.click();
      fixture.detectChanges();

      expect(component.isThemeMenuOpen()).toBe(true);

      themeButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      fixture.detectChanges();

      expect(component.isThemeMenuOpen()).toBe(false);
    });

    it('should close when clicking outside of the dropdown while open', async () => {
      await createComponent();

      const themeButton = getThemeToggleButton();
      themeButton.click();
      fixture.detectChanges();

      expect(component.isThemeMenuOpen()).toBe(true);

      document.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
      fixture.detectChanges();

      expect(component.isThemeMenuOpen()).toBe(false);
    });

    it('should NOT close when clicking inside the dropdown while open', async () => {
      await createComponent();

      const themeButton = getThemeToggleButton();
      themeButton.click();
      fixture.detectChanges();

      expect(component.isThemeMenuOpen()).toBe(true);

      const dropdownContainer = fixture.debugElement.query(By.css('#themeDropdown, [ng-reflect-ng-reflect]'));
      const dropdownNative =
        fixture.debugElement.query(By.css('.dropdown')).nativeElement as HTMLElement;

      dropdownNative.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
      fixture.detectChanges();

      expect(component.isThemeMenuOpen()).toBe(true);
    });

    it('should emit themeChanged and close the menu when selecting a theme', async () => {
      await createComponent({ selectedTheme: 'light' as Theme });

      const emitSpy = vi.spyOn(component.themeChanged, 'emit');

      getThemeToggleButton().click();
      fixture.detectChanges();

      const themeButtons = fixture.debugElement.queryAll(By.css('[role="menu"] button[role="menuitemradio"]'));
      expect(themeButtons.length).toBeGreaterThan(0);

      (themeButtons[0].nativeElement as HTMLButtonElement).click();
      fixture.detectChanges();

      expect(emitSpy).toHaveBeenCalledTimes(1);
      expect(emitSpy).toHaveBeenCalledWith(expect.any(String));

      expect(component.isThemeMenuOpen()).toBe(false);
    });

    it('should set aria-expanded according to open state', async () => {
      await createComponent();

      const themeButton = getThemeToggleButton();

      expect(themeButton.getAttribute('aria-expanded')).toBe('false');

      themeButton.click();
      fixture.detectChanges();

      expect(themeButton.getAttribute('aria-expanded')).toBe('true');
    });
  });

  describe('scroll shadow behavior', () => {
    it('should toggle shadow-xs on navbar when scrolling (throttled)', fakeAsync(async () => {
      await createComponent();

      const navbarElement = fixture.debugElement.query(By.css('.navbar')).nativeElement as HTMLElement;

      navbarElement.classList.remove('shadow-xs');

      vi.spyOn(window, 'scrollY', 'get').mockReturnValue(10);

      window.dispatchEvent(new Event('scroll'));

      tick(60);
      fixture.detectChanges();

      expect(navbarElement.classList.contains('shadow-xs')).toBe(true);

      vi.spyOn(window, 'scrollY', 'get').mockReturnValue(0);

      window.dispatchEvent(new Event('scroll'));
      tick(60);
      fixture.detectChanges();

      expect(navbarElement.classList.contains('shadow-xs')).toBe(false);
    }));
  });
});
