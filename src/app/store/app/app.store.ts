import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme } from '../../constants/themes-array';

interface IState {
  theme: Theme;
  hasGeoAccess: boolean;
}

const INITIAL_STATE: IState = {
  hasGeoAccess: false,
  theme: 'light',
};

const PERSISTENCE_KEY = 'app';

@Injectable()
export class AppStore extends ComponentStore<IState> {
  readonly selectTheme$: Observable<Theme> = this.select(
    (state) => state.theme,
  );

  readonly selectHasGeoAccess$: Observable<boolean> = this.select(
    (state) => state.hasGeoAccess,
  );

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

  initialize(): Promise<IState> {
    return new Promise((resolve, reject) => {
      try {
        const state = AppStore.lookupPersistedState() ?? INITIAL_STATE;
        this.setState(state);
        AppStore.persistState(state);
        resolve(state);
      } catch {
        reject(new Error('Unable to initialize state.'));
      }
    });
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
      return {
        ...INITIAL_STATE,
        ...sanitizedState,
      };
    }
  }
}
