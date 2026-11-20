import { describe, it, expect, afterEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppStore } from '../store/app/app.store';
import { geoAccessGuard, accessDeniedGuard } from './geo-access-guard';

const EX_TZ = 'Asia/Tehran';
const TZ = 'Europe/Berlin';

function runGuard(guard: typeof geoAccessGuard): unknown {
  return TestBed.runInInjectionContext(() => guard({} as never, {} as never));
}

function mockTimezone(timezone: string): void {
  vi.spyOn(Intl, 'DateTimeFormat').mockReturnValue({
    resolvedOptions: () =>
      ({ timeZone: timezone }) as Intl.ResolvedDateTimeFormatOptions,
  } as Intl.DateTimeFormat);
}

describe('geo-access guards', () => {
  const hasGeoAccess = signal(false);

  beforeEach(() => {
    hasGeoAccess.set(false);
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: AppStore, useValue: { hasGeoAccess } },
      ],
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('geoAccessGuard', () => {
    it('blocks access when timezone is suspended', () => {
      mockTimezone(EX_TZ);
      expect(runGuard(geoAccessGuard)).not.toBe(true);
    });

    it('grants access when timezone is not suspended', () => {
      mockTimezone(TZ);
      expect(runGuard(geoAccessGuard)).toBe(true);
    });

    it('grants access in a suspended timezone after the password', () => {
      mockTimezone(EX_TZ);
      hasGeoAccess.set(true);
      expect(runGuard(geoAccessGuard)).toBe(true);
    });
  });

  describe('accessDeniedGuard', () => {
    it('grants access when timezone is suspended', () => {
      mockTimezone(EX_TZ);
      expect(runGuard(accessDeniedGuard)).toBe(true);
    });

    it('blocks access when timezone is not suspended', () => {
      mockTimezone(TZ);
      expect(runGuard(accessDeniedGuard)).not.toBe(true);
    });

    it('blocks access in a suspended timezone after the password', () => {
      mockTimezone(EX_TZ);
      hasGeoAccess.set(true);
      expect(runGuard(accessDeniedGuard)).not.toBe(true);
    });
  });
});
