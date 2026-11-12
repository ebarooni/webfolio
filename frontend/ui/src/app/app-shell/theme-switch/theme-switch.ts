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

import { Theme } from '../../config/themes-array';
import { celestialOffset, HILL_COLORS, seasonOf } from './sky';

const CHASE_TOGGLE_COUNT = 5;
const CHASE_WINDOW_MS = 2000;
const CHASE_DURATION_MS = 1900;

@Component({
  selector: 'app-theme-switch',
  imports: [TranslocoDirective],
  templateUrl: './theme-switch.html',
  styleUrl: './theme-switch.css',
})
export class ThemeSwitch {
  private readonly destroyRef = inject(DestroyRef);
  private readonly createdAt = new Date();

  private recentToggleTimes: number[] = [];
  private chaseTimeoutId = 0;

  readonly theme = input.required<Theme>();
  readonly themeChanged = output<Theme>();

  readonly season = seasonOf(this.createdAt);
  readonly hillColors = HILL_COLORS[this.season];
  readonly isChasing = signal(false);

  readonly isDark = computed(() => this.theme() === 'dark');

  readonly celestialTransform = computed(
    () => `translate(0 ${celestialOffset(this.theme(), this.createdAt)})`,
  );

  constructor() {
    this.destroyRef.onDestroy(() => {
      window.clearTimeout(this.chaseTimeoutId);
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
    window.clearTimeout(this.chaseTimeoutId);
    this.chaseTimeoutId = window.setTimeout(() => {
      this.isChasing.set(false);
    }, CHASE_DURATION_MS);
  }
}
