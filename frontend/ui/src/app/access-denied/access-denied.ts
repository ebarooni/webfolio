import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { AppStore } from '../store/app/app.store';
import { Route } from '../config/route';
import { FormsModule } from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.html',
  imports: [FormsModule, TranslocoDirective],
  host: {
    class: 'flex min-h-dvh flex-col bg-base-100',
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
