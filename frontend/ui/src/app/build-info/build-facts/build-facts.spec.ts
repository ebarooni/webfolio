import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslocoService } from '@jsverse/transloco';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { BUILD_INFO } from '../../../environments/build-info';
import { localizationTestingModule } from '../../../testing/localization-testing';
import { BuildFacts, describeAge } from './build-facts';

describe('BuildFacts', () => {
  const buildTime = new Date(BUILD_INFO.buildTime);

  let fixture: ComponentFixture<BuildFacts>;

  function values(): string[] {
    return fixture.debugElement
      .queryAll(By.css('dd'))
      .map((value) => (value.nativeElement as HTMLElement).textContent.trim());
  }

  beforeEach(async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(buildTime.getTime() + 3 * 60 * 60 * 1000));

    await TestBed.configureTestingModule({
      imports: [BuildFacts, localizationTestingModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(BuildFacts);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should show the version and the age of the build', () => {
    expect(values()[0]).toBe(BUILD_INFO.version);
    expect(values()[1]).toBe('3 hours ago');
  });

  it('should show the age in the active language', () => {
    TestBed.inject(TranslocoService).setActiveLang('de');
    fixture.detectChanges();

    expect(values()[1]).toBe('vor 3 Stunden');
  });

  it.each([
    { minutes: 0, expected: '0 minutes ago' },
    { minutes: 59, expected: '59 minutes ago' },
    { minutes: 60, expected: '1 hour ago' },
    { minutes: 23 * 60 + 59, expected: '23 hours ago' },
    { minutes: 24 * 60, expected: '1 day ago' },
    { minutes: 10 * 24 * 60, expected: '10 days ago' },
    { minutes: -5, expected: '0 minutes ago' },
  ])(
    'should describe $minutes minutes as "$expected"',
    ({ minutes, expected }) => {
      const now = new Date(buildTime.getTime() + minutes * 60 * 1000);

      expect(describeAge(buildTime, now, 'en')).toBe(expected);
    },
  );
});
