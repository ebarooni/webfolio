import { FirebaseService } from './firebase.service';
import { IS_DEV_MODE } from '../../tokens/is-dev-mode';
import { Provider } from '@angular/core';

export const provideFirebaseService = (): Provider[] => [
  {
    deps: [IS_DEV_MODE],
    provide: FirebaseService,
    useFactory: (isDevMode: boolean) => new FirebaseService(isDevMode),
  },
];
