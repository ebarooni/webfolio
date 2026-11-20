import { isPlatformBrowser } from '@angular/common';
import {
  booleanAttribute,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  PLATFORM_ID,
  signal,
} from '@angular/core';

import { type CodeLanguage, highlight } from '../highlight';

type CopyState = 'idle' | 'copied' | 'failed';

const COPY_FEEDBACK_MS = 2000;

/** A dark code sample with a file name, syntax colors and a copy button. */
@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.html',
  styleUrl: './code-block.css',
  host: {
    '[class.compact]': 'compact()',
  },
})
export class CodeBlock {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private feedbackTimeoutId: ReturnType<typeof setTimeout> | undefined;

  readonly code = input.required<string>();
  readonly language = input.required<CodeLanguage>();
  readonly label = input('');
  readonly compact = input(false, { transform: booleanAttribute });

  readonly tokens = computed(() => highlight(this.code(), this.language()));
  readonly copyState = signal<CopyState>('idle');

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
      await navigator.clipboard.writeText(this.code());
      this.showFeedback('copied');
    } catch {
      this.showFeedback('failed');
    }
  }

  private showFeedback(state: CopyState): void {
    this.copyState.set(state);
    clearTimeout(this.feedbackTimeoutId);
    this.feedbackTimeoutId = setTimeout(() => {
      this.copyState.set('idle');
    }, COPY_FEEDBACK_MS);
  }
}
