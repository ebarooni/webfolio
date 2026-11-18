import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  DEFAULT_LANGUAGE,
  detectLanguage,
  isLanguage,
  Language,
} from '../../config/languages';
import { Theme } from '../../config/themes-array';

export interface IState {
  theme: Theme;
  hasGeoAccess: boolean;
  language: Language;
  developerMode: boolean;
}

const INITIAL_STATE: IState = {
  developerMode: false,
  hasGeoAccess: false,
  language: DEFAULT_LANGUAGE,
  theme: 'light',
};

const PERSISTENCE_KEY = 'app:v1';

@Injectable({ providedIn: 'root' })
export class AppStore extends ComponentStore<IState> {
  readonly selectTheme$: Observable<Theme> = this.select(
    (state) => state.theme,
  );

  readonly selectHasGeoAccess$: Observable<boolean> = this.select(
    (state) => state.hasGeoAccess,
  );

  readonly selectLanguage$: Observable<Language> = this.select(
    (state) => state.language,
  );

  readonly selectDeveloperMode$: Observable<boolean> = this.select(
    (state) => state.developerMode,
  );

  readonly updateLanguage = this.updater((state, value: Language) => {
    const update = {
      ...state,
      language: value,
    };

    AppStore.persistState(update);
    return update;
  });

  readonly enableDeveloperMode = this.updater((state) => {
    const update = {
      ...state,
      developerMode: true,
    };

    AppStore.persistState(update);
    return update;
  });

  readonly updateTheme = this.updater((state, value: Theme) => {
    const update = {
      ...state,
      theme: value,
    };

    AppStore.persistState(update);
    return update;
  });

  readonly updateHasGeoAccess = this.updater((state, value: string) => {
    const update = {
      ...state,
      hasGeoAccess: value === 'dogecoin',
    };

    AppStore.persistState(update);
    return update;
  });

  initialize(): IState {
    const state = AppStore.lookupPersistedState() ?? AppStore.defaultState();
    this.setState(state);
    AppStore.persistState(state);
    return state;
  }

  // A first visit follows the language of the browser.
  private static defaultState(): IState {
    return {
      ...INITIAL_STATE,
      language: detectLanguage(navigator.languages),
    };
  }

  private static persistState(state: IState): void {
    localStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
  }

  private static lookupPersistedState(): IState | null {
    const stateString = localStorage.getItem(PERSISTENCE_KEY);
    if (!stateString) {
      return null;
    } else {
      const parsedState = JSON.parse(stateString) as IState;
      const sanitizedState = Object.keys(parsedState).reduce((prev, curr) => {
        if (curr in INITIAL_STATE) {
          prev = {
            ...prev,
            [curr]: parsedState[curr as keyof IState],
          };
        }
        return prev;
      }, {} as IState);

      const mergedState = {
        ...AppStore.defaultState(),
        ...sanitizedState,
      };

      if (typeof mergedState.developerMode !== 'boolean') {
        mergedState.developerMode = INITIAL_STATE.developerMode;
      }

      if (!isLanguage(mergedState.language)) {
        mergedState.language = AppStore.defaultState().language;
      }

      if (typeof mergedState.hasGeoAccess !== 'boolean') {
        mergedState.hasGeoAccess = INITIAL_STATE.hasGeoAccess;
      }

      if (typeof mergedState.theme !== 'string') {
        mergedState.theme = INITIAL_STATE.theme;
      }

      return mergedState;
    }
  }
}
