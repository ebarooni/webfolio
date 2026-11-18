import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  Injector,
  input,
  output,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';

import { Language, LANGUAGE_NAMES, languages } from '../../config/languages';

type StarPosition = Readonly<{ transform: string }>;

type LanguageOption = Readonly<{ code: Language; name: string }>;

const EXTRA_GREETINGS: readonly string[] = ['Hola', 'Salut', 'Ciao', 'Hej'];
const HOLD_DURATION_MS = 2000;
const GREETING_INTERVAL_MS = 900;
const EUROPEAN_STAR_COUNT = 12;
const EUROPEAN_STAR_RING_RADIUS = 13;

// The flags and greetings roll to the row of the active language.
// "Hallo" is the same word in German and Dutch, so both use the second row.
const GREETING_ROW: Readonly<Record<Language, number>> = {
  de: 1,
  en: 0,
  nl: 1,
};

// The European stars circle the flags of the EU member languages.
const EUROPEAN_LANGUAGES: ReadonlySet<Language> = new Set(['de', 'nl']);

let nextMenuId = 0;

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
  imports: [NgTemplateOutlet, TranslocoDirective],
  templateUrl: './language-switch.html',
  styleUrl: './language-switch.css',
  host: {
    '(document:pointerdown)': 'closeOnOutsidePointer($event)',
  },
})
export class LanguageSwitch {
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);

  private readonly trigger =
    viewChild.required<ElementRef<HTMLButtonElement>>('trigger');
  private readonly items = viewChildren<ElementRef<HTMLButtonElement>>('item');

  private holdTimeoutId = 0;
  private greetingIntervalId = 0;
  private wasHeld = false;

  readonly language = input.required<Language>();
  readonly languageChanged = output<Language>();

  readonly menuId = `language-menu-${nextMenuId++}`;
  readonly options: readonly LanguageOption[] = languages.map((code) => ({
    code,
    name: LANGUAGE_NAMES[code],
  }));
  readonly europeanStars = createEuropeanStars();
  readonly extraGreeting = signal<string | null>(null);
  readonly isOpen = signal(false);

  readonly languageName = computed(() => LANGUAGE_NAMES[this.language()]);
  readonly flagRow = computed(() => languages.indexOf(this.language()));
  readonly greetingRow = computed(() => GREETING_ROW[this.language()]);
  readonly isEuropean = computed(() => EUROPEAN_LANGUAGES.has(this.language()));

  constructor() {
    this.destroyRef.onDestroy(() => {
      window.clearTimeout(this.holdTimeoutId);
      window.clearInterval(this.greetingIntervalId);
    });
  }

  toggleMenu(): void {
    // The click that ends a long press must not open the menu.
    if (this.wasHeld) {
      this.wasHeld = false;
      return;
    }

    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  onTriggerKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.open(event.key === 'ArrowUp' ? 'last' : 'active');
    }
  }

  onMenuKeydown(event: KeyboardEvent): void {
    const items = this.items().map((item) => item.nativeElement);
    const current = items.indexOf(document.activeElement as HTMLButtonElement);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        items[(current + 1) % items.length]?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        items[(current - 1 + items.length) % items.length]?.focus();
        break;
      case 'Home':
        event.preventDefault();
        items[0]?.focus();
        break;
      case 'End':
        event.preventDefault();
        items[items.length - 1]?.focus();
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        this.trigger().nativeElement.focus();
        break;
      case 'Tab':
        this.close();
        break;
    }
  }

  select(language: Language): void {
    this.close();
    this.trigger().nativeElement.focus();

    if (language !== this.language()) {
      this.languageChanged.emit(language);
    }
  }

  closeOnOutsidePointer(event: PointerEvent): void {
    if (
      this.isOpen() &&
      !this.host.nativeElement.contains(event.target as Node | null)
    ) {
      this.close();
    }
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

  private open(focus: 'active' | 'last' = 'active'): void {
    this.isOpen.set(true);

    afterNextRender(
      () => {
        const items = this.items().map((item) => item.nativeElement);
        const index =
          focus === 'last' ? items.length - 1 : Math.max(this.flagRow(), 0);

        items[index]?.focus();
      },
      { injector: this.injector },
    );
  }

  private close(): void {
    this.isOpen.set(false);
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
