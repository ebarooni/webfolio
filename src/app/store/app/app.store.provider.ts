import { AppStore } from './app.store';
import { Provider } from '@angular/core';

const appStoreFactory = () => new AppStore();

export const provideAppStore = (): Provider[] => [
  {
    provide: AppStore,
    useFactory: () => appStoreFactory(),
  },
];
