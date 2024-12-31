import { InjectionToken } from '@angular/core';

export const IS_DEV_MODE = new InjectionToken<boolean>(
  'Returns true if running in development',
  {
    factory: () => false,
  },
);
