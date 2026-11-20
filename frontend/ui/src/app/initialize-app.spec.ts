import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { localizationTestingModule } from '../testing/localization-testing';
import { initializeApp } from './initialize-app';
import { AppStore, IState } from './store/app/app.store';

describe('initializeApp', () => {
  const persistedState: IState = {
    developerMode: false,
    hasGeoAccess: false,
    language: 'de',
    languageSuggestionDismissed: false,
    theme: 'dark',
  };

  let appStore: { initialize: ReturnType<typeof vi.fn<() => IState>> };

  function runInitializer(): void {
    TestBed.runInInjectionContext(() => {
      initializeApp();
    });
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

  it('should apply the stored theme to the document', () => {
    appStore.initialize.mockReturnValue(persistedState);

    runInitializer();

    expect(appStore.initialize).toHaveBeenCalledOnce();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should leave the language to the address of the page', () => {
    appStore.initialize.mockReturnValue(persistedState);

    runInitializer();

    expect(document.documentElement.hasAttribute('lang')).toBe(false);
  });

  it('should log the error when the app store initialization throws', () => {
    const error = new Error('Initialization failed');
    const debugSpy = vi
      .spyOn(console, 'debug')
      .mockImplementation(() => undefined);
    appStore.initialize.mockImplementation(() => {
      throw error;
    });

    expect(() => {
      runInitializer();
    }).not.toThrow();

    expect(debugSpy).toHaveBeenCalledExactlyOnceWith(error);
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
  });
});
