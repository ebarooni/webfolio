import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { localizationTestingModule } from '../testing/localization-testing';
import { initializeApp } from './initialize-app';
import { AppStore, IState } from './store/app/app.store';

describe('initializeApp', () => {
  const persistedState: IState = {
    developerMode: false,
    hasGeoAccess: false,
    language: 'de',
    theme: 'dark',
  };

  let appStore: { initialize: ReturnType<typeof vi.fn<() => IState>> };

  function runInitializer(): Promise<void> {
    return TestBed.runInInjectionContext(() => initializeApp());
  }

  beforeEach(() => {
    appStore = { initialize: vi.fn<() => IState>() };

    TestBed.configureTestingModule({
      imports: [localizationTestingModule()],
      providers: [{ provide: AppStore, useValue: appStore }],
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.removeAttribute('lang');
  });

  it('should apply the stored theme and language to the document', async () => {
    appStore.initialize.mockReturnValue(persistedState);

    await runInitializer();

    expect(appStore.initialize).toHaveBeenCalledOnce();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.documentElement.getAttribute('lang')).toBe('de');
  });

  it('should load the translation of the stored language before the start', async () => {
    const translocoService = TestBed.inject(TranslocoService);
    appStore.initialize.mockReturnValue(persistedState);

    await runInitializer();

    expect(translocoService.getActiveLang()).toBe('de');
    expect(translocoService.translate('shell.nav.work')).toBe('Projekte');
  });

  it('should log the error when the app store initialization throws', async () => {
    const error = new Error('Initialization failed');
    const debugSpy = vi
      .spyOn(console, 'debug')
      .mockImplementation(() => undefined);
    appStore.initialize.mockImplementation(() => {
      throw error;
    });

    await expect(runInitializer()).resolves.toBeUndefined();

    expect(debugSpy).toHaveBeenCalledExactlyOnceWith(error);
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
  });
});
