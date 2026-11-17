import { inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@jsverse/transloco';

/**
 * Gives the active language as a signal. Call it in an injection context,
 * for example in a field initializer of a component.
 */
export function injectActiveLanguage(): Signal<string> {
  const translocoService = inject(TranslocoService);

  return toSignal(translocoService.langChanges$, {
    initialValue: translocoService.getActiveLang(),
  });
}
