import { LogService } from './log.service';
import { Provider } from '@angular/core';
import { IS_DEV_MODE } from '../../tokens/is-dev-mode';

const logServiceFactory = (isDevMode: boolean) => new LogService(isDevMode);

export const provideLogService = (): Provider[] => [
  {
    provide: LogService,
    useFactory: (isDevMode: boolean) => logServiceFactory(isDevMode),
    deps: [IS_DEV_MODE],
  },
];
