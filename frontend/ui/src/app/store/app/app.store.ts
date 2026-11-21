import {
  getState,
  patchState,
  signalStore,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  DEFAULT_LANGUAGE,
  detectLanguage,
  isLanguage,
  Language,
} from '../../config/languages';
import { Theme, themesArray } from '../../config/themes-array';

export interface IState {
  theme: Theme;
  hasGeoAccess: boolean;
  /**
   * The language that the visitor chose last, or the browser language on
   * the first visit. The address sets the language of the page. This one
   * only feeds the suggestion to open the page in another language.
   */
  language: Language;
  developerMode: boolean;
  languageSuggestionDismissed: boolean;
}

const INITIAL_STATE: IState = {
  developerMode: false,
  hasGeoAccess: false,
  language: DEFAULT_LANGUAGE,
  languageSuggestionDismissed: false,
  theme: 'light',
};

const PERSISTENCE_KEY = 'app:v1';

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState<IState>(INITIAL_STATE),
  withMethods((store) => {
    function update(changes: Partial<IState>): void {
      patchState(store, changes);
      persistState(getState(store));
    }

    return {
      updateLanguage(language: Language): void {
        update({ language });
      },

      dismissLanguageSuggestion(): void {
        update({ languageSuggestionDismissed: true });
      },

      enableDeveloperMode(): void {
        update({ developerMode: true });
      },

      updateTheme(theme: Theme): void {
        update({ theme });
      },

      updateHasGeoAccess(password: string): void {
        // Autofill and phone keyboards can add spaces or a capital letter.
        update({
          hasGeoAccess: password.trim().toLowerCase() === 'dogecoin',
        });
      },

      initialize(): IState {
        const state = lookupPersistedState() ?? defaultState();
        update(state);
        return state;
      },
    };
  }),
);

export type AppStore = InstanceType<typeof AppStore>;

// A first visit follows the language of the browser.
function defaultState(): IState {
  return {
    ...INITIAL_STATE,
    language: detectLanguage(navigator.languages),
  };
}

function persistState(state: IState): void {
  localStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
}

function lookupPersistedState(): IState | null {
  const stateString = localStorage.getItem(PERSISTENCE_KEY);
  if (!stateString) {
    return null;
  }

  const parsedState = parsePersistedState(stateString);
  if (!parsedState) {
    return null;
  }

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
    ...defaultState(),
    ...sanitizedState,
  };

  if (typeof mergedState.developerMode !== 'boolean') {
    mergedState.developerMode = INITIAL_STATE.developerMode;
  }

  if (!isLanguage(mergedState.language)) {
    mergedState.language = defaultState().language;
  }

  if (typeof mergedState.languageSuggestionDismissed !== 'boolean') {
    mergedState.languageSuggestionDismissed =
      INITIAL_STATE.languageSuggestionDismissed;
  }

  if (typeof mergedState.hasGeoAccess !== 'boolean') {
    mergedState.hasGeoAccess = INITIAL_STATE.hasGeoAccess;
  }

  if (!themesArray.includes(mergedState.theme)) {
    mergedState.theme = INITIAL_STATE.theme;
  }

  return mergedState;
}

// Unreadable JSON or a value that is not an object counts as no saved state,
// so the visit starts from the default state and the browser language.
function parsePersistedState(stateString: string): IState | null {
  try {
    const parsed: unknown = JSON.parse(stateString);

    return parsed !== null &&
      typeof parsed === 'object' &&
      !Array.isArray(parsed)
      ? (parsed as IState)
      : null;
  } catch {
    return null;
  }
}
