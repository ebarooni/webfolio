import { TestBed } from '@angular/core/testing';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { DOCUMENT } from '@angular/common';
import { initializeApp } from './initialize-app';
import { AppStore } from './store/app/app.store';
import { Theme } from './config/constants/themes-array';

describe('initializeApp', () => {
  const setup = (opts?: { theme?: Theme; initReject?: unknown }) => {
    const theme = opts?.theme ?? 'dark';

    const appStoreMock: Pick<AppStore, 'initialize'> = {
      initialize: vi.fn(() => {
        if (opts?.initReject !== undefined) {
          // eslint-disable-next-line @typescript-eslint/only-throw-error
          throw opts.initReject;
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
        return { theme } as any;
      }),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: AppStore, useValue: appStoreMock }],
    });

    const doc = TestBed.inject(DOCUMENT);
    return { appStoreMock, doc };
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should call AppStore.initialize and set data-theme on <html>', () => {
    const { appStoreMock } = setup({ theme: 'light' });

    TestBed.runInInjectionContext(() => initializeApp());

    expect(appStoreMock.initialize).toHaveBeenCalledTimes(1);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should overwrite an existing data-theme attribute', () => {
    const { appStoreMock } = setup({ theme: 'light' });
    document.documentElement.setAttribute('data-theme', 'dark');

    TestBed.runInInjectionContext(() => initializeApp());

    expect(appStoreMock.initialize).toHaveBeenCalledTimes(1);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should call Log.debug when AppStore.initialize throws', () => {
    const err = new Error('init failed');
    const { appStoreMock } = setup({ initReject: err });

    TestBed.runInInjectionContext(() => initializeApp());

    expect(appStoreMock.initialize).toHaveBeenCalledTimes(1);

    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
  });
});
