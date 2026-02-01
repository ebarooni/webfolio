import { Inject, Injectable } from '@angular/core';
import { IS_DEV_MODE } from '../config/is-dev-mode';

@Injectable({
  providedIn: 'root'
})
export class Log {

  constructor(@Inject(IS_DEV_MODE) private readonly isDevMode: boolean) {}

  debug(error: Error): void {
    if (!this.isDevMode) {
      return;
    }

    console.debug(
      `${Log.formatOutputString(this.debug.name, error.message)}`,
      error,
    );
  }

  info(description: string): void {
    if (!this.isDevMode) {
      return;
    }

    console.info(`${Log.formatOutputString(this.info.name, description)}`);
  }

  private static formatOutputString(
    logLevel: string,
    message?: string,
  ): string {
    const LOG_LEVEL = logLevel.toUpperCase();
    return `${LOG_LEVEL}${message ? ': ' + message : ''}`;
  }
}
