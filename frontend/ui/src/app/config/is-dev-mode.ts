import { InjectionToken } from '@angular/core';

export const IS_DEV_MODE = new InjectionToken<boolean>(
  'True if running in development environment',
  {
    factory: () => false,
  },
);
