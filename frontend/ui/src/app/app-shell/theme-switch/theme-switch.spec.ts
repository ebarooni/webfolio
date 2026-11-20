import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { localizationTestingModule } from '../../../testing/localization-testing';
import type { Theme } from '../../config/themes-array';
import { neutralOffset } from './sky';
import { ThemeSwitch } from './theme-switch';

describe('ThemeSwitch', () => {
  let fixture: ComponentFixture<ThemeSwitch>;
  let component: ThemeSwitch;
  let themeChanged: ReturnType<typeof vi.fn<(theme: Theme) => void>>;

  function button(): HTMLButtonElement {
    return fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;
  }

  function toggle(times: number): void {
    for (let click = 0; click < times; click += 1) {
      fixture.debugElement.query(By.css('button')).triggerEventHandler('click');
    }

    fixture.detectChanges();
  }

  function createSwitch(timeZone: string, theme: Theme): void {
    vi.spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions').mockReturnValue({
      ...new Intl.DateTimeFormat().resolvedOptions(),
      timeZone,
    });
    fixture = TestBed.createComponent(ThemeSwitch);
    component = fixture.componentInstance;
    themeChanged = vi.fn();
    component.themeChanged.subscribe(themeChanged);
    fixture.componentRef.setInput('theme', theme);
    fixture.detectChanges();
  }

  beforeEach(async () => {
    // Intl stays real, so the spy below can set the time zone.
    vi.useFakeTimers({
      toFake: [
        'Date',
        'setTimeout',
        'clearTimeout',
        'setInterval',
        'clearInterval',
      ],
    });
    vi.setSystemTime(new Date('2026-04-15T10:00:00Z'));

    await TestBed.configureTestingModule({
      imports: [ThemeSwitch, localizationTestingModule()],
    }).compileComponents();

    createSwitch('Europe/Berlin', 'light');
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it.each([
    { theme: 'light', next: 'dark', pressed: 'false' },
    { theme: 'dark', next: 'light', pressed: 'true' },
  ] as const)(
    'should switch from $theme to $next',
    ({ theme, next, pressed }) => {
      fixture.componentRef.setInput('theme', theme);
      fixture.detectChanges();

      expect(button().getAttribute('aria-pressed')).toBe(pressed);
      expect(button().classList.contains('is-dark')).toBe(theme === 'dark');

      toggle(1);

      expect(themeChanged).toHaveBeenCalledExactlyOnceWith(next);
    },
  );

  it('should have a translated label', () => {
    expect(button().getAttribute('aria-label')).toBe(
      'Switch between light and dark theme',
    );
  });

  it('should show the season and the sun of the time zone', () => {
    expect(component.celestialTransform()).toBe('translate(0 -0.7)');
    expect(component.season()).toBe('spring');
    expect(fixture.debugElement.query(By.css('.blossoms'))).toBeTruthy();
  });

  it('should show the moon phase in the dark theme', () => {
    fixture.componentRef.setInput('theme', 'dark');
    fixture.detectChanges();

    const litPart = fixture.debugElement.query(
      By.css('#theme-switch-moon-lit path'),
    ).nativeElement as SVGPathElement;

    expect(litPart.getAttribute('d')).toBe(component.moon().litPath);
    expect(component.celestialTransform()).toBe(
      `translate(0 ${component.moon().offset})`,
    );
  });

  it.each([
    { theme: 'light', body: 'sun' },
    { theme: 'dark', body: 'moon' },
  ] as const)(
    'should show the neutral $body for a time zone without a city',
    ({ theme, body }) => {
      const offset = neutralOffset(body, new Date());

      fixture.destroy();
      createSwitch('UTC', theme);

      expect(component.sun().core).toBe('#ffc533');
      expect(component.moon().rotation).toBe(0);
      expect(component.moon().hasShadow).toBe(false);
      expect(component.celestialTransform()).toBe(`translate(0 ${offset})`);
    },
  );

  it('should move the sun as time goes by', () => {
    const noonTransform = component.celestialTransform();

    vi.advanceTimersByTime(6 * 60 * 60 * 1000);
    fixture.detectChanges();

    expect(component.celestialTransform()).not.toBe(noonTransform);
  });

  it('should not start the chase after four quick toggles', () => {
    toggle(4);

    expect(component.isChasing()).toBe(false);
  });

  it('should run the chase once after five quick toggles', () => {
    toggle(5);

    expect(button().classList.contains('is-chasing')).toBe(true);

    vi.advanceTimersByTime(1900);
    fixture.detectChanges();

    expect(button().classList.contains('is-chasing')).toBe(false);
  });

  it('should ignore toggles that are too far apart', () => {
    toggle(4);
    vi.advanceTimersByTime(2100);
    toggle(1);

    expect(component.isChasing()).toBe(false);
  });
});
