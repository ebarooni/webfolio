import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  output,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

import { Theme } from '../../config/themes-array';
import {
  HILL_COLORS,
  KNOB_CENTER_X,
  KNOB_CENTER_Y,
  moonLook,
  seasonOf,
  sunLook,
} from './sky';
import { locateVisitor } from './time-zone-location';

const CHASE_TOGGLE_COUNT = 5;
const CHASE_WINDOW_MS = 2000;
const CHASE_DURATION_MS = 1900;
const SKY_REFRESH_MS = 60_000;

@Component({
  selector: 'app-theme-switch',
  imports: [TranslocoDirective],
  templateUrl: './theme-switch.html',
  styleUrl: './theme-switch.css',
})
export class ThemeSwitch {
  private readonly destroyRef = inject(DestroyRef);
  private readonly now = signal(new Date());
  private readonly location = locateVisitor();

  private recentToggleTimes: number[] = [];
  private chaseTimeoutId = 0;

  readonly theme = input.required<Theme>();
  readonly themeChanged = output<Theme>();

  readonly isChasing = signal(false);

  readonly isDark = computed(() => this.theme() === 'dark');
  readonly season = computed(() =>
    seasonOf(this.now(), this.location?.latitude),
  );
  readonly hillColors = computed(() => HILL_COLORS[this.season()]);
  readonly sun = computed(() => sunLook(this.now(), this.location));
  readonly moon = computed(() => moonLook(this.now(), this.location));

  readonly celestialTransform = computed(() => {
    const offset = this.isDark() ? this.moon().offset : this.sun().offset;

    return `translate(0 ${offset})`;
  });

  readonly moonTransform = computed(
    () => `rotate(${this.moon().rotation} ${KNOB_CENTER_X} ${KNOB_CENTER_Y})`,
  );

  constructor() {
    // A prerendered page must not wait for a timer that never ends.
    if (!isPlatformBrowser(inject(PLATFORM_ID))) {
      return;
    }

    const refreshIntervalId = setInterval(() => {
      this.now.set(new Date());
    }, SKY_REFRESH_MS);

    this.destroyRef.onDestroy(() => {
      clearInterval(refreshIntervalId);
      clearTimeout(this.chaseTimeoutId);
    });
  }

  toggle(): void {
    this.themeChanged.emit(this.isDark() ? 'light' : 'dark');
    this.startChaseAfterRapidToggles();
  }

  // Five quick toggles make the sun and the moon chase each other once.
  private startChaseAfterRapidToggles(): void {
    const now = Date.now();

    this.recentToggleTimes = [
      ...this.recentToggleTimes.filter((time) => now - time < CHASE_WINDOW_MS),
      now,
    ];

    if (this.recentToggleTimes.length < CHASE_TOGGLE_COUNT) {
      return;
    }

    this.recentToggleTimes = [];
    this.isChasing.set(true);
    clearTimeout(this.chaseTimeoutId);
    this.chaseTimeoutId = setTimeout(() => {
      this.isChasing.set(false);
    }, CHASE_DURATION_MS);
  }
}
