import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  input,
  PLATFORM_ID,
  signal,
} from '@angular/core';

import { injectCopy } from '../../../localization/localized-copy';
import { CODE_COPY } from '../code/code.copy';

const COPIED_FEEDBACK_MS = 2000;

/** One install command on a single line, with a copy button. */
@Component({
  selector: 'app-install-command',
  templateUrl: './install-command.html',
  styleUrl: './install-command.css',
})
export class InstallCommand {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private feedbackTimeoutId: ReturnType<typeof setTimeout> | undefined;

  readonly text = injectCopy(CODE_COPY);
  readonly command = input.required<string>();
  readonly copied = signal(false);

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      clearTimeout(this.feedbackTimeoutId);
    });
  }

  async copy(): Promise<void> {
    if (!this.isBrowser) {
      return;
    }

    try {
      await navigator.clipboard.writeText(this.command());
    } catch {
      return;
    }

    this.copied.set(true);
    clearTimeout(this.feedbackTimeoutId);
    this.feedbackTimeoutId = setTimeout(() => {
      this.copied.set(false);
    }, COPIED_FEEDBACK_MS);
  }
}
