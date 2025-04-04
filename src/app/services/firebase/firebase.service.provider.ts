import { FirebaseService } from './firebase.service';
import { Provider } from '@angular/core';

export const provideFirebaseService = (): Provider[] => [
  {
    provide: FirebaseService,
    useFactory: () => new FirebaseService(),
  },
];
