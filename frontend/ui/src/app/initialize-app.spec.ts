import { TestBed } from '@angular/core/testing';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { DOCUMENT } from '@angular/common';
import { initializeApp } from './initialize-app';
import { AppStore } from './store/app/app.store';
import { Log } from './log/log';
import { Theme } from './config/constants/themes-array';

describe('initializeApp', () => {
  const setup = (opts?: { theme?: Theme; initReject?: unknown }) => {
    const theme = opts?.theme ?? 'dark';

    const appStoreMock: Pick<AppStore, 'initialize'> = {
      initialize: vi.fn(() => {
        if (opts?.initReject !== undefined) {
          throw opts.initReject;
        }
        return { theme } as any;
      }),
    };

    const logMock: Pick<Log, 'debug'> = {
      debug: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AppStore, useValue: appStoreMock },
        { provide: Log, useValue: logMock },
      ],
    });

    const doc = TestBed.inject(DOCUMENT);
    return { appStoreMock, logMock, doc };
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should call AppStore.initialize and set data-theme on <html>', async () => {
    const { appStoreMock } = setup({ theme: 'light' });

    await TestBed.runInInjectionContext(() => initializeApp());

    expect(appStoreMock.initialize).toHaveBeenCalledTimes(1);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should overwrite an existing data-theme attribute', async () => {
    const { appStoreMock } = setup({ theme: 'light' });
    document.documentElement.setAttribute('data-theme', 'dark');

    await TestBed.runInInjectionContext(() => initializeApp());

    expect(appStoreMock.initialize).toHaveBeenCalledTimes(1);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should call Log.debug when AppStore.initialize throws', async () => {
    const err = new Error('init failed');
    const { appStoreMock, logMock } = setup({ initReject: err });

    await TestBed.runInInjectionContext(() => initializeApp());

    expect(appStoreMock.initialize).toHaveBeenCalledTimes(1);
    expect(logMock.debug).toHaveBeenCalledTimes(1);
    expect(logMock.debug).toHaveBeenCalledWith(err);

    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
  });

  it('should pass a non-Error rejection to Log.debug as an Error-cast value', async () => {
    const nonError = 'boom';
    const { logMock } = setup({ initReject: nonError });

    await TestBed.runInInjectionContext(() => initializeApp());

    expect(logMock.debug).toHaveBeenCalledTimes(1);
    expect(logMock.debug).toHaveBeenCalledWith(nonError as unknown as Error);
  });
});
