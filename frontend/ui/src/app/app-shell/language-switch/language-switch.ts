import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

import { Language } from '../../config/languages';

type StarPosition = Readonly<{ transform: string }>;

const EXTRA_GREETINGS: readonly string[] = ['Hola', 'Salut', 'Ciao', 'Hej'];
const HOLD_DURATION_MS = 2000;
const GREETING_INTERVAL_MS = 900;
const EUROPEAN_STAR_COUNT = 12;
const EUROPEAN_STAR_RING_RADIUS = 13;

function createEuropeanStars(): readonly StarPosition[] {
  return Array.from({ length: EUROPEAN_STAR_COUNT }, (_, index) => {
    const angle = (index / EUROPEAN_STAR_COUNT) * 2 * Math.PI;
    const x = (EUROPEAN_STAR_RING_RADIUS * Math.sin(angle)).toFixed(3);
    const y = (-EUROPEAN_STAR_RING_RADIUS * Math.cos(angle)).toFixed(3);

    return { transform: `translate(${x} ${y}) scale(0.8)` };
  });
}

@Component({
  selector: 'app-language-switch',
  imports: [TranslocoDirective],
  templateUrl: './language-switch.html',
  styleUrl: './language-switch.css',
})
export class LanguageSwitch {
  private readonly destroyRef = inject(DestroyRef);

  private holdTimeoutId = 0;
  private greetingIntervalId = 0;
  private wasHeld = false;

  readonly language = input.required<Language>();
  readonly languageChanged = output<Language>();

  readonly europeanStars = createEuropeanStars();
  readonly extraGreeting = signal<string | null>(null);

  readonly isGerman = computed(() => this.language() === 'de');

  constructor() {
    this.destroyRef.onDestroy(() => {
      window.clearTimeout(this.holdTimeoutId);
      window.clearInterval(this.greetingIntervalId);
    });
  }

  toggle(): void {
    // The click that ends a long press must not change the language.
    if (this.wasHeld) {
      this.wasHeld = false;
      return;
    }

    this.languageChanged.emit(this.isGerman() ? 'en' : 'de');
  }

  startHold(): void {
    this.wasHeld = false;
    window.clearTimeout(this.holdTimeoutId);
    this.holdTimeoutId = window.setTimeout(() => {
      this.wasHeld = true;
      this.showExtraGreetings();
    }, HOLD_DURATION_MS);
  }

  cancelHold(): void {
    window.clearTimeout(this.holdTimeoutId);
  }

  private showExtraGreetings(): void {
    let greetingIndex = 0;

    window.clearInterval(this.greetingIntervalId);
    this.extraGreeting.set(EXTRA_GREETINGS[greetingIndex]);

    this.greetingIntervalId = window.setInterval(() => {
      greetingIndex += 1;

      if (greetingIndex >= EXTRA_GREETINGS.length) {
        window.clearInterval(this.greetingIntervalId);
        this.extraGreeting.set(null);
        return;
      }

      this.extraGreeting.set(EXTRA_GREETINGS[greetingIndex]);
    }, GREETING_INTERVAL_MS);
  }
}
