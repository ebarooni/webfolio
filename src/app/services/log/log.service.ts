import { Inject, Injectable } from '@angular/core';
import { IS_DEV_MODE } from '../../tokens/is-dev-mode';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'off';

@Injectable()
export class LogService {
  private readonly logLevel: LogLevel;

  constructor(@Inject(IS_DEV_MODE) private readonly isDevMode: boolean) {
    this.logLevel = this.isDevMode ? 'debug' : 'off';
  }

  log(error: unknown, message?: string, logLevel?: LogLevel): void {
    if (!this.isDevMode) {
      return;
    } else {
      const mergedLogLevel = logLevel || this.logLevel;
      switch (mergedLogLevel) {
        case 'debug':
          console.debug(
            `🐛 ${LogService.formatOutputString(mergedLogLevel, message)}`,
            error,
          );
          return;
        case 'info':
          console.info(
            `ℹ️ ${LogService.formatOutputString(mergedLogLevel, message)}`,
            error,
          );
          return;
        case 'warn':
          console.warn(
            `⚠️ ${LogService.formatOutputString(mergedLogLevel, message)}`,
            error,
          );
          return;
        case 'error':
          console.error(
            `❌ ${LogService.formatOutputString(mergedLogLevel, message)}`,
            error,
          );
          return;
        default:
          console.log(
            `🤔 ${LogService.formatOutputString(mergedLogLevel, message)}`,
            error,
          );
          return;
      }
    }
  }

  private static formatOutputString(
    logLevel: LogLevel,
    message?: string,
  ): string {
    const LOG_LEVEL = logLevel.toUpperCase();
    return `${LOG_LEVEL}${message ? ' ' + message : ''}:\n`;
  }
}
