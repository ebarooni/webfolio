import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { AppStore } from '../store/app/app.store';
import { Route } from '../config/constants/route';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.html',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'min-h-dvh flex',
  },
})
export class AccessDenied {
  private readonly store = inject(AppStore);
  private readonly router = inject(Router);

  readonly password = signal('');
  readonly isPasswordValid = computed(() => this.password().trim().length >= 6);

  readonly hasGeoAccess = toSignal(this.store.selectHasGeoAccess$, {
    initialValue: false,
  });

  constructor() {
    effect(() => {
      if (this.hasGeoAccess()) {
        void this.router.navigateByUrl(Route.HOME);
      }
    });
  }

  updatePassword(event: Event): void {
    this.password.set((event.target as HTMLInputElement).value);
  }

  submit(): void {
    if (!this.isPasswordValid()) {
      return;
    }

    this.store.updateHasGeoAccess(this.password());
  }
}
