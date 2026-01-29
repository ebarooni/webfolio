import { IS_DEV_MODE } from '../../tokens/is-dev-mode';
import { LogService } from './log.service';
import { Provider } from '@angular/core';

const logServiceFactory = (isDevMode: boolean) => new LogService(isDevMode);

export const provideLogService = (): Provider[] => [
  {
    deps: [IS_DEV_MODE],
    provide: LogService,
    useFactory: (isDevMode: boolean) => logServiceFactory(isDevMode),
  },
];
