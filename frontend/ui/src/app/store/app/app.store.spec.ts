import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Theme } from '../../config/themes-array';
import { AppStore, IState } from './app.store';

describe('AppStore', () => {
  const persistenceKey = 'app:v1';

  const defaultState: IState = {
    developerMode: false,
    hasGeoAccess: false,
    language: 'en',
    theme: 'light',
  };

  let store: AppStore;

  function persistedState(): unknown {
    return JSON.parse(localStorage.getItem(persistenceKey) ?? 'null');
  }

  function preferLanguages(languages: readonly string[]): void {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(languages);
  }

  beforeEach(() => {
    localStorage.clear();
    preferLanguages(['en-US']);

    TestBed.configureTestingModule({
      providers: [AppStore],
    });

    store = TestBed.inject(AppStore);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('should initialize and persist the default state', () => {
    const state = store.initialize();

    expect(state).toEqual(defaultState);
    expect(persistedState()).toEqual(defaultState);
  });

  it('should follow the browser language on the first visit', () => {
    preferLanguages(['fr-FR', 'de-DE', 'en-US']);

    expect(store.initialize().language).toBe('de');
  });

  it('should keep known persisted values and drop unknown properties', () => {
    localStorage.setItem(
      persistenceKey,
      JSON.stringify({
        developerMode: true,
        hasGeoAccess: true,
        language: 'de',
        theme: 'dark',
        unknown: 'value',
      }),
    );

    expect(store.initialize()).toEqual({
      developerMode: true,
      hasGeoAccess: true,
      language: 'de',
      theme: 'dark',
    });
  });

  it.each([
    { persisted: { hasGeoAccess: 'yes' }, expected: { hasGeoAccess: false } },
    { persisted: { theme: 42 }, expected: { theme: 'light' } },
    { persisted: { language: 'fr' }, expected: { language: 'en' } },
    { persisted: { developerMode: 1 }, expected: { developerMode: false } },
    { persisted: { theme: 'dark' }, expected: { theme: 'dark' } },
  ])(
    'should repair the persisted state $persisted',
    ({ persisted, expected }) => {
      localStorage.setItem(persistenceKey, JSON.stringify(persisted));

      const state = store.initialize();

      expect(state).toEqual({ ...defaultState, ...expected });
      expect(persistedState()).toEqual(state);
    },
  );

  it('should update and persist the theme', async () => {
    store.initialize();

    store.updateTheme('dark' satisfies Theme);

    expect(await firstValueFrom(store.selectTheme$)).toBe('dark');
    expect(persistedState()).toEqual({ ...defaultState, theme: 'dark' });
  });

  it('should update and persist the language', async () => {
    store.initialize();

    store.updateLanguage('de');

    expect(await firstValueFrom(store.selectLanguage$)).toBe('de');
    expect(persistedState()).toEqual({ ...defaultState, language: 'de' });
  });

  it('should enable and persist the developer mode', async () => {
    store.initialize();

    store.enableDeveloperMode();

    expect(await firstValueFrom(store.selectDeveloperMode$)).toBe(true);
    expect(persistedState()).toEqual({ ...defaultState, developerMode: true });
  });

  it.each([
    { value: 'dogecoin', expected: true },
    { value: 'bitcoin', expected: false },
    { value: '', expected: false },
  ])(
    'should set the geo access to $expected for "$value"',
    async ({ value, expected }) => {
      store.initialize();

      store.updateHasGeoAccess(value);

      expect(await firstValueFrom(store.selectHasGeoAccess$)).toBe(expected);
      expect(persistedState()).toEqual({
        ...defaultState,
        hasGeoAccess: expected,
      });
    },
  );
});
