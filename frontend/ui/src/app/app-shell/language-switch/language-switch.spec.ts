import { Component } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { localizationTestingModule } from '../../../testing/localization-testing';
import type { Language } from '../../config/languages';
import { LanguageSwitch } from './language-switch';

@Component({ template: '' })
class EmptyPage {}

describe('LanguageSwitch', () => {
  let fixture: ComponentFixture<LanguageSwitch>;
  let component: LanguageSwitch;
  let languageChanged: ReturnType<typeof vi.fn<(language: Language) => void>>;

  function triggerButton(): HTMLButtonElement {
    return fixture.debugElement.query(By.css('.language-switch'))
      .nativeElement as HTMLButtonElement;
  }

  function trigger(eventName: string, event?: unknown): void {
    fixture.debugElement
      .query(By.css('.language-switch'))
      .triggerEventHandler(eventName, event);
    fixture.detectChanges();
  }

  function menu(): HTMLElement | undefined {
    return fixture.debugElement.query(By.css('[role="menu"]'))
      ?.nativeElement as HTMLElement | undefined;
  }

  function options(): HTMLAnchorElement[] {
    return fixture.debugElement
      .queryAll(By.css('[role="menuitemradio"]'))
      .map((option) => option.nativeElement as HTMLAnchorElement);
  }

  function pressInMenu(key: string): void {
    document.activeElement?.dispatchEvent(
      new KeyboardEvent('keydown', { key, bubbles: true }),
    );
    fixture.detectChanges();
  }

  function greeting(): string | undefined {
    const element = fixture.debugElement.query(By.css('.greeting'));

    return (element?.nativeElement as HTMLElement | undefined)?.textContent;
  }

  beforeEach(async () => {
    vi.useFakeTimers();

    await TestBed.configureTestingModule({
      imports: [LanguageSwitch, localizationTestingModule()],
      providers: [provideRouter([{ path: '**', component: EmptyPage }])],
    }).compileComponents();

    await TestBed.inject(Router).navigateByUrl(
      '/de/blog/from-astro-to-angular',
    );

    fixture = TestBed.createComponent(LanguageSwitch);
    component = fixture.componentInstance;
    languageChanged = vi.fn();
    component.languageChanged.subscribe(languageChanged);
    fixture.componentRef.setInput('language', 'en');
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement as HTMLElement);
  });

  afterEach(() => {
    (fixture.nativeElement as HTMLElement).remove();
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with a closed menu', () => {
    expect(menu()).toBeUndefined();
    expect(triggerButton().getAttribute('aria-expanded')).toBe('false');
    expect(triggerButton().getAttribute('aria-haspopup')).toBe('menu');
  });

  it('should name the current language on the button', () => {
    expect(triggerButton().getAttribute('aria-label')).toBe(
      'Change language, current language: English',
    );
  });

  it('should list every language in its own name and language', () => {
    trigger('click');

    expect(
      options().map((option) => [
        option.getAttribute('lang'),
        option.textContent.trim(),
      ]),
    ).toEqual([
      ['en', 'English'],
      ['de', 'Deutsch'],
      ['nl', 'Nederlands'],
    ]);
    expect(triggerButton().getAttribute('aria-expanded')).toBe('true');
  });

  it('should link each option to the same page in its language', () => {
    trigger('click');

    expect(
      options().map((option) => [
        option.getAttribute('hreflang'),
        option.getAttribute('href'),
      ]),
    ).toEqual([
      ['en', '/blog/from-astro-to-angular'],
      ['de', '/de/blog/from-astro-to-angular'],
      ['nl', '/nl/blog/from-astro-to-angular'],
    ]);
  });

  it.each([
    { language: 'en', checked: 'en', row: '0' },
    { language: 'de', checked: 'de', row: '1' },
    { language: 'nl', checked: 'nl', row: '2' },
  ] as const)(
    'should mark $checked and show its flag when the language is $language',
    ({ language, checked, row }) => {
      fixture.componentRef.setInput('language', language);
      fixture.detectChanges();
      trigger('click');

      const checkedOptions = options().filter(
        (option) => option.getAttribute('aria-checked') === 'true',
      );

      expect(checkedOptions.map((option) => option.lang)).toEqual([checked]);
      expect(triggerButton().style.getPropertyValue('--flag-row')).toBe(row);
      expect(triggerButton().classList.contains('is-european')).toBe(
        language !== 'en',
      );
    },
  );

  it.each(['de', 'nl'] as const)(
    'should emit %s and close the menu when it is chosen',
    (language) => {
      trigger('click');
      fixture.debugElement
        .query(By.css(`[role="menuitemradio"][lang="${language}"]`))
        .triggerEventHandler('click', new MouseEvent('click'));
      fixture.detectChanges();

      expect(languageChanged).toHaveBeenCalledExactlyOnceWith(language);
      expect(menu()).toBeUndefined();
    },
  );

  // Choosing the language of the page also stores it as the visitor's choice.
  it('should emit the current language when it is chosen again', () => {
    trigger('click');
    options()[0].click();
    fixture.detectChanges();

    expect(languageChanged).toHaveBeenCalledExactlyOnceWith('en');
    expect(menu()).toBeUndefined();
  });

  it('should close the menu on a second click of the button', () => {
    trigger('click');
    trigger('click');

    expect(menu()).toBeUndefined();
  });

  it('should close the menu on a press outside of it', () => {
    trigger('click');
    document.body.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true }),
    );
    fixture.detectChanges();

    expect(menu()).toBeUndefined();
  });

  it('should move the focus with the arrow keys and close on Escape', async () => {
    fixture.componentRef.setInput('language', 'de');
    trigger('keydown', new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await fixture.whenStable();

    expect(document.activeElement?.getAttribute('lang')).toBe('de');

    pressInMenu('ArrowDown');

    expect(document.activeElement?.getAttribute('lang')).toBe('nl');

    pressInMenu('ArrowDown');

    expect(document.activeElement?.getAttribute('lang')).toBe('en');

    pressInMenu('End');

    expect(document.activeElement?.getAttribute('lang')).toBe('nl');

    pressInMenu('Escape');

    expect(menu()).toBeUndefined();
    expect(document.activeElement).toBe(triggerButton());
    expect(languageChanged).not.toHaveBeenCalled();
  });

  it('should draw the twelve European stars', () => {
    const stars = fixture.debugElement.queryAll(By.css('.european-stars path'));

    expect(stars).toHaveLength(12);
  });

  it('should not show extra greetings after a short press', () => {
    trigger('pointerdown');
    vi.advanceTimersByTime(500);
    trigger('pointerup');
    vi.advanceTimersByTime(2000);
    fixture.detectChanges();

    expect(greeting()).toBeUndefined();
  });

  it('should cycle the extra greetings after a long press', () => {
    trigger('pointerdown');
    vi.advanceTimersByTime(2000);
    fixture.detectChanges();

    expect(greeting()).toBe('Hola');

    vi.advanceTimersByTime(900);
    fixture.detectChanges();

    expect(greeting()).toBe('Salut');

    vi.advanceTimersByTime(900 * 3);
    fixture.detectChanges();

    expect(greeting()).toBeUndefined();
  });

  it('should keep the menu closed after a long press', () => {
    trigger('pointerdown');
    vi.advanceTimersByTime(2000);
    trigger('pointerup');
    trigger('click');

    expect(menu()).toBeUndefined();

    trigger('click');

    expect(menu()).toBeDefined();
  });
});
