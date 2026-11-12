import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { localizationTestingModule } from '../../../testing/localization-testing';
import type { Language } from '../../config/languages';
import type { Theme } from '../../config/themes-array';
import { LanguageSwitch } from '../language-switch/language-switch';
import { ThemeSwitch } from '../theme-switch/theme-switch';
import { Navbar } from './navbar';

describe('Navbar', () => {
  let fixture: ComponentFixture<Navbar>;
  let component: Navbar;

  function linkTexts(): string[] {
    return fixture.debugElement
      .queryAll(By.css('nav a'))
      .map((link) =>
        (link.nativeElement as HTMLAnchorElement).textContent.trim(),
      );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar, localizationTestingModule()],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('selectedTheme', 'light');
    fixture.componentRef.setInput('selectedLanguage', 'en');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render every link once', () => {
    expect(fixture.debugElement.queryAll(By.css('nav'))).toHaveLength(1);
    expect(linkTexts()).toEqual(['Work', 'Writing', 'About', 'Contact']);
  });

  it('should link the about entry to the experience section', () => {
    const aboutLink = fixture.debugElement
      .queryAll(By.css('nav a'))
      .map((link) => link.nativeElement as HTMLAnchorElement)
      .find((link) => link.textContent.trim() === 'About');

    expect(aboutLink?.getAttribute('href')).toBe('/#experience');
  });

  it('should pass the inputs to both switches', () => {
    const themeSwitch = fixture.debugElement.query(By.directive(ThemeSwitch))
      .componentInstance as ThemeSwitch;
    const languageSwitch = fixture.debugElement.query(
      By.directive(LanguageSwitch),
    ).componentInstance as LanguageSwitch;

    expect(themeSwitch.theme()).toBe('light');
    expect(languageSwitch.language()).toBe('en');
  });

  it('should forward the events of both switches', () => {
    const themeChanged = vi.fn<(theme: Theme) => void>();
    const languageChanged = vi.fn<(language: Language) => void>();
    component.themeChanged.subscribe(themeChanged);
    component.languageChanged.subscribe(languageChanged);

    fixture.debugElement
      .query(By.css('app-theme-switch button'))
      .triggerEventHandler('click');
    fixture.debugElement
      .query(By.css('app-language-switch button'))
      .triggerEventHandler('click');

    expect(themeChanged).toHaveBeenCalledExactlyOnceWith('dark');
    expect(languageChanged).toHaveBeenCalledExactlyOnceWith('de');
  });
});
