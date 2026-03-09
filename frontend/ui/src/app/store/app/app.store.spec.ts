import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { AppStore } from './app.store';
import { Theme } from '../../config/themes-array';

describe('AppStore', () => {
  const persistenceKey = 'app:v1';

  let store: AppStore;
  let originalPersistedState: string | null;

  beforeAll(() => {
    originalPersistedState = localStorage.getItem(persistenceKey);
  });

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [AppStore],
    });

    store = TestBed.inject(AppStore);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
    localStorage.clear();
  });

  afterAll(() => {
    localStorage.clear();

    if (originalPersistedState !== null) {
      localStorage.setItem(persistenceKey, originalPersistedState);
    }
  });

  it('initializes with the default state when no persisted state exists', () => {
    const state = store.initialize();

    expect(state).toEqual({
      hasGeoAccess: false,
      theme: 'light',
    });

    expect(JSON.parse(localStorage.getItem(persistenceKey) ?? 'null')).toEqual(
      state,
    );
  });

  it('initializes with the sanitized persisted state and ignores unknown properties', () => {
    const persistedState = {
      hasGeoAccess: true,
      theme: 'custom-theme' as Theme,
      unknown: 'value',
    };

    localStorage.setItem(persistenceKey, JSON.stringify(persistedState));

    const state = store.initialize();

    expect(state).toEqual({
      hasGeoAccess: true,
      theme: 'custom-theme' as Theme,
    });

    expect(JSON.parse(localStorage.getItem(persistenceKey) ?? 'null')).toEqual(
      state,
    );
  });

  it.each([
    [
      { hasGeoAccess: 'yes', theme: 42 },
      { hasGeoAccess: false, theme: 'light' },
    ],
    [
      { hasGeoAccess: null, theme: 'persisted-theme' },
      { hasGeoAccess: false, theme: 'persisted-theme' },
    ],
    [{ hasGeoAccess: true }, { hasGeoAccess: true, theme: 'light' }],
  ])(
    'initializes with merged and type safe persisted state for %j',
    (
      persistedState: Partial<Record<'theme' | 'hasGeoAccess', unknown>>,
      expectedState: { theme: string; hasGeoAccess: boolean },
    ) => {
      localStorage.setItem(persistenceKey, JSON.stringify(persistedState));

      const state = store.initialize();

      expect(state).toEqual(expectedState);

      expect(
        JSON.parse(localStorage.getItem(persistenceKey) ?? 'null'),
      ).toEqual(expectedState);
    },
  );

  it('updates the theme selector and persists the new theme', () => {
    store.initialize();

    const emittedThemes: Theme[] = [];
    const subscription = store.selectTheme$.subscribe((theme) => {
      emittedThemes.push(theme);
    });

    const nextTheme = 'dark-theme' as Theme;

    store.updateTheme(nextTheme);

    expect(emittedThemes.at(-1)).toBe(nextTheme);

    expect(JSON.parse(localStorage.getItem(persistenceKey) ?? 'null')).toEqual({
      hasGeoAccess: false,
      theme: nextTheme,
    });

    subscription.unsubscribe();
  });

  it.each([
    ['dogecoin', true],
    ['bitcoin', false],
    ['', false],
  ])(
    'updates geo access to %s when the value is %s',
    (value: string, expectedHasGeoAccess: boolean) => {
      store.initialize();

      const emittedValues: boolean[] = [];
      const subscription = store.selectHasGeoAccess$.subscribe(
        (hasGeoAccess) => {
          emittedValues.push(hasGeoAccess);
        },
      );

      store.updateHasGeoAccess(value);

      expect(emittedValues.at(-1)).toBe(expectedHasGeoAccess);

      expect(
        JSON.parse(localStorage.getItem(persistenceKey) ?? 'null'),
      ).toEqual({
        hasGeoAccess: expectedHasGeoAccess,
        theme: 'light',
      });

      subscription.unsubscribe();
    },
  );
});
