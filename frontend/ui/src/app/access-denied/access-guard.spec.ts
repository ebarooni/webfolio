import { describe, it, expect, afterEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID, signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppStore } from '../store/app/app.store';
import { accessGuard, accessDeniedGuard } from './access-guard';

const EX_TZ = 'Asia/Tehran';
const EX_TZ_ALIAS = 'Iran';
const TZ = 'Europe/Berlin';

function runGuard(guard: typeof accessGuard): unknown {
  return TestBed.runInInjectionContext(() => guard({} as never, {} as never));
}

function mockTimezone(timezone: string): void {
  vi.spyOn(Intl, 'DateTimeFormat').mockReturnValue({
    resolvedOptions: () =>
      ({ timeZone: timezone }) as Intl.ResolvedDateTimeFormatOptions,
  } as Intl.DateTimeFormat);
}

describe('access guards', () => {
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

  describe('accessGuard', () => {
    it('blocks access when timezone is suspended', () => {
      mockTimezone(EX_TZ);
      expect(runGuard(accessGuard)).not.toBe(true);
    });

    it('grants access when timezone is not suspended', () => {
      mockTimezone(TZ);
      expect(runGuard(accessGuard)).toBe(true);
    });

    it('grants access in a suspended timezone after the password', () => {
      mockTimezone(EX_TZ);
      hasGeoAccess.set(true);
      expect(runGuard(accessGuard)).toBe(true);
    });

    it('blocks the alias of a suspended timezone', () => {
      mockTimezone(EX_TZ_ALIAS);
      expect(runGuard(accessGuard)).not.toBe(true);
    });

    it('blocks the suspended offset when the zone name is not known', () => {
      mockTimezone('Etc/Unknown');
      vi.spyOn(Date.prototype, 'getTimezoneOffset').mockReturnValue(-210);
      expect(runGuard(accessGuard)).not.toBe(true);
    });

    it('never blocks while pages are prerendered', () => {
      mockTimezone(EX_TZ);
      TestBed.overrideProvider(PLATFORM_ID, { useValue: 'server' });
      expect(runGuard(accessGuard)).toBe(true);
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
