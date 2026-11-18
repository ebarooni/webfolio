import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { localizationTestingModule } from '../../../testing/localization-testing';
import type { Theme } from '../../config/themes-array';
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

  beforeEach(async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 3, 15, 12));

    await TestBed.configureTestingModule({
      imports: [ThemeSwitch, localizationTestingModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeSwitch);
    component = fixture.componentInstance;
    themeChanged = vi.fn();
    component.themeChanged.subscribe(themeChanged);
    fixture.componentRef.setInput('theme', 'light');
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
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

  it('should show the season and the time of day', () => {
    expect(component.season).toBe('spring');
    expect(fixture.debugElement.query(By.css('.blossoms'))).toBeTruthy();
    expect(component.celestialTransform()).toBe('translate(0 -3)');
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
