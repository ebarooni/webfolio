import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Theme } from 'daisyui';
import { Observable } from 'rxjs';

interface IState {
  theme: Theme;
}

const INITIAL_STATE: IState = {
  theme: 'light',
};

const PERSISTENCE_KEY = 'app';

@Injectable()
export class AppStore extends ComponentStore<IState> {
  readonly selectTheme$: Observable<Theme> = this.select(
    (state) => state.theme,
  );

  readonly updateTheme = this.updater((state, value: Theme) => {
    const update = {
      ...state,
      theme: value,
    };
    AppStore.persistState(update);
    return update;
  });

  initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const state = AppStore.lookupPersistedState() || INITIAL_STATE;
        this.setState(state);
        AppStore.persistState(state);
        resolve();
      } catch (error) {
        reject(error);
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
      const sanitizedState = Object.keys(parsedState).reduce(
        (prev, curr) => {
          if (curr in INITIAL_STATE) {
            prev = {
              ...prev,
              [curr]: parsedState[curr as keyof IState],
            };
          }
          return prev;
        },
        <IState>{},
      );
      return {
        ...INITIAL_STATE,
        ...parsedState,
      };
    }
  }
}
