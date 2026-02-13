import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { AppStore } from '../store/app/app.store';
import { Route } from '../config/constants/route';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './access-denied.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessDenied {
  private readonly store = inject(AppStore);
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly contactForm = this.fb.group({
    password: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  readonly hasGeoAccess = toSignal(this.store.selectHasGeoAccess$, {
    initialValue: false,
  });

  private readonly redirectEffect = effect(() => {
    if (this.hasGeoAccess()) {
      void this.router.navigateByUrl(Route.HOME);
    }
  });

  submit(): void {
    if (this.contactForm.invalid) return;

    const { password } = this.contactForm.getRawValue();
    this.store.updateHasGeoAccess(password);
  }
}
