import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { describe, beforeEach, it, expect, vi } from 'vitest';

import { Navbar } from './navbar';
import { Theme } from '../../config/themes-array';

describe('Navbar', () => {
  let fixture: ComponentFixture<Navbar>;
  let component: Navbar;

  const selectedTheme: Theme = 'light';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('selectedTheme', selectedTheme);
    fixture.componentRef.setInput('version', '1.0.0');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders navigation items', () => {
    const links = fixture.debugElement.queryAll(By.css('.join a.btn'));
    expect(links.length).toBeGreaterThan(0);
  });

  it('renders version when provided', () => {
    const links = fixture.debugElement.queryAll(By.css('.join a.btn'));
    const versionLink = links.find((link) => {
      const el = link.nativeElement as HTMLAnchorElement;
      return el.textContent?.includes('1.0.0');
    });

    expect(versionLink).toBeDefined();
  });

  it('toggles theme menu when clicking theme button', () => {
    const buttonDe = fixture.debugElement.query(By.css('button'));
    const button = buttonDe.nativeElement as HTMLButtonElement;

    expect(component.isThemeMenuOpen()).toBe(false);

    button.click();
    fixture.detectChanges();

    expect(component.isThemeMenuOpen()).toBe(true);

    button.click();
    fixture.detectChanges();

    expect(component.isThemeMenuOpen()).toBe(false);
  });

  it('closes theme menu via closeThemeMenu', () => {
    component.isThemeMenuOpen.set(true);
    component.closeThemeMenu();
    expect(component.isThemeMenuOpen()).toBe(false);
  });

  it('emits themeChanged when selecting a theme', () => {
    const spy = vi.fn();
    component.themeChanged.subscribe(spy);

    const theme: Theme = component.themes[0];

    component.selectTheme(theme);

    expect(spy).toHaveBeenCalledWith(theme);
    expect(component.isThemeMenuOpen()).toBe(false);
  });

  it('opens dropdown and renders theme options', () => {
    component.isThemeMenuOpen.set(true);
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(
      By.css('[role="menuitemradio"]'),
    );
    expect(buttons.length).toBe(component.themes.length);
  });
});
