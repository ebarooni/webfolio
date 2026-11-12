import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { localizationTestingModule } from '../../../testing/localization-testing';
import type { Language } from '../../config/languages';
import { LanguageSwitch } from './language-switch';

describe('LanguageSwitch', () => {
  let fixture: ComponentFixture<LanguageSwitch>;
  let component: LanguageSwitch;
  let languageChanged: ReturnType<typeof vi.fn<(language: Language) => void>>;

  function trigger(eventName: string): void {
    fixture.debugElement.query(By.css('button')).triggerEventHandler(eventName);
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
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSwitch);
    component = fixture.componentInstance;
    languageChanged = vi.fn();
    component.languageChanged.subscribe(languageChanged);
    fixture.componentRef.setInput('language', 'en');
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it.each([
    { language: 'en', next: 'de' },
    { language: 'de', next: 'en' },
  ] as const)('should switch from $language to $next', ({ language, next }) => {
    fixture.componentRef.setInput('language', language);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;

    expect(button.classList.contains('is-german')).toBe(language === 'de');

    trigger('click');

    expect(languageChanged).toHaveBeenCalledExactlyOnceWith(next);
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

  it('should keep the language after a long press', () => {
    trigger('pointerdown');
    vi.advanceTimersByTime(2000);
    trigger('pointerup');
    trigger('click');

    expect(languageChanged).not.toHaveBeenCalled();

    trigger('click');

    expect(languageChanged).toHaveBeenCalledExactlyOnceWith('de');
  });
});
