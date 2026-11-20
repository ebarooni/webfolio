import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { AppStore } from '../store/app/app.store';
import { Route } from '../config/route';
import { FormsModule } from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';

import { Button } from '../shared/components/button/button';
import { FormField } from '../shared/components/form-field/form-field';
import { Monogram } from '../shared/components/monogram/monogram';
import { PageIntro } from '../shared/components/page-intro/page-intro';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.html',
  imports: [
    Button,
    FormField,
    FormsModule,
    Monogram,
    PageIntro,
    TranslocoDirective,
  ],
  host: {
    class: 'flex min-h-dvh flex-col bg-base-100',
  },
})
export class AccessDenied {
  private readonly store = inject(AppStore);
  private readonly router = inject(Router);

  readonly password = signal('');
  readonly isPasswordValid = computed(() => this.password().trim().length >= 6);

  readonly hasGeoAccess = this.store.hasGeoAccess;

  /** True after a submit with a password that did not unlock the site. */
  readonly isPasswordWrong = signal(false);

  constructor() {
    effect(() => {
      if (this.hasGeoAccess()) {
        void this.router.navigateByUrl(Route.HOME);
      }
    });
  }

  updatePassword(event: Event): void {
    this.password.set((event.target as HTMLInputElement).value);
    this.isPasswordWrong.set(false);
  }

  submit(): void {
    if (!this.isPasswordValid()) {
      return;
    }

    this.store.updateHasGeoAccess(this.password());
    this.isPasswordWrong.set(!this.hasGeoAccess());
  }
}
