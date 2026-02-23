import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideLocationMocks } from '@angular/common/testing';
import { provideRouter, RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { CompactNavbar } from './compact-navbar';
import type { Theme } from '../../config/constants/themes-array';

describe('CompactNavbar', () => {
  let component: CompactNavbar;
  let fixture: ComponentFixture<CompactNavbar>;

  const setInputs = (opts?: {
    theme?: Theme;
    version?: string | undefined;
  }) => {
    fixture.componentRef.setInput(
      'selectedTheme',
      opts?.theme ?? ('light' as Theme),
    );
    fixture.componentRef.setInput('version', opts?.version);
    fixture.detectChanges();
  };

  beforeEach(async () => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();

    await TestBed.configureTestingModule({
      imports: [CompactNavbar],
      providers: [provideRouter([]), provideLocationMocks()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CompactNavbar);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    setInputs();
    expect(component).toBeTruthy();
  });

  it('should throw if required selectedTheme input is not provided', async () => {
    TestBed.resetTestingModule();

    await TestBed.configureTestingModule({
      imports: [CompactNavbar],
      providers: [provideRouter([]), provideLocationMocks()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    const f = TestBed.createComponent(CompactNavbar);
    expect(() => f.detectChanges()).toThrow();
  });

  it('should render Theme button', () => {
    setInputs();

    const themeBtn = fixture.debugElement
      .queryAll(By.css('button'))
      .find((b) =>
        (b.nativeElement as HTMLButtonElement).textContent?.includes('Theme'),
      );

    expect(themeBtn).toBeTruthy();
  });

  it('should toggle menu open state when hamburger is clicked', () => {
    setInputs();

    const toggleBtn = fixture.debugElement.query(
      By.css('button[aria-controls="compact-nav-menu"]'),
    );
    expect(toggleBtn).toBeTruthy();

    expect(component.isMenuOpen()).toBe(false);

    toggleBtn.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();
    expect(component.isMenuOpen()).toBe(true);

    toggleBtn.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();
    expect(component.isMenuOpen()).toBe(false);
  });

  it('should apply collapse-open class when menu is open', () => {
    setInputs();

    const root = fixture.debugElement.query(By.css('div.collapse'));
    expect(root).toBeTruthy();

    expect(
      (root.nativeElement as HTMLElement).classList.contains('collapse-open'),
    ).toBe(false);

    component.isMenuOpen.set(true);
    fixture.detectChanges();

    expect(
      (root.nativeElement as HTMLElement).classList.contains('collapse-open'),
    ).toBe(true);
  });

  it('should apply bg-base-300 to the title when menu is open', () => {
    setInputs();

    const title = fixture.debugElement.query(By.css('.collapse-title'));
    expect(title).toBeTruthy();

    expect(
      (title.nativeElement as HTMLElement).classList.contains('bg-base-300'),
    ).toBe(false);

    component.isMenuOpen.set(true);
    fixture.detectChanges();

    expect(
      (title.nativeElement as HTMLElement).classList.contains('bg-base-300'),
    ).toBe(true);
  });

  it('should render nav items (without Build when version is undefined)', () => {
    setInputs({ version: undefined });

    const links = fixture.debugElement.queryAll(By.css('#compact-nav-menu a'));
    const texts = links
      .map((l) => (l.nativeElement as HTMLAnchorElement).textContent?.trim())
      .filter(Boolean);

    expect(texts).toContain('Home');
    expect(texts).toContain('Blog');
    expect(texts).toContain('Projects');
    expect(texts).toContain('Contact');

    expect(texts).not.toContain('Build');
  });

  it('should show version text for the Build item when version is provided', () => {
    setInputs({ version: '1.2.3' });

    const links = fixture.debugElement.queryAll(By.css('#compact-nav-menu a'));
    const texts = links
      .map((l) => (l.nativeElement as HTMLAnchorElement).textContent?.trim())
      .filter(Boolean);

    expect(texts).toContain('1.2.3');
  });

  it('should close the menu when clicking a nav link', () => {
    setInputs({ version: undefined });

    component.isMenuOpen.set(true);
    fixture.detectChanges();

    const firstLink = fixture.debugElement.query(By.css('#compact-nav-menu a'));
    expect(firstLink).toBeTruthy();

    firstLink.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    expect(component.isMenuOpen()).toBe(false);
  });

  it('Home link should have RouterLink and an href', () => {
    setInputs({ version: undefined });

    const homeDe = fixture.debugElement
      .queryAll(By.css('#compact-nav-menu a'))
      .find(
        (de) =>
          (de.nativeElement as HTMLAnchorElement).textContent?.trim() ===
          'Home',
      );

    expect(homeDe).toBeTruthy();

    const routerLinkDir = homeDe!.injector.get(RouterLink, null);
    expect(routerLinkDir).toBeTruthy();

    const href = (homeDe!.nativeElement as HTMLAnchorElement).getAttribute(
      'href',
    );
    expect(href).toBeTruthy();
  });
});
