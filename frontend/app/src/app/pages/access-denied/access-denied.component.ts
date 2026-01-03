import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, inject } from '@angular/core';
import { map, tap } from 'rxjs';
import { AppStore } from '../../store/app/app.store';
import { AsyncPipe } from '@angular/common';
import { BaseLayoutComponent } from '../../layouts/base-layout/base-layout.component';
import { Route } from '../../constants/route';
import { Router } from '@angular/router';

@Component({
  imports: [BaseLayoutComponent, FormsModule, ReactiveFormsModule, AsyncPipe],
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
})
export class AccessDeniedComponent {
  private readonly store = inject(AppStore);
  private readonly router = inject(Router);

  readonly hasGeoAccess$ = this.store.selectHasGeoAccess$.pipe(
    tap((hasGeoAccess) => {
      if (hasGeoAccess) {
        void this.router.navigateByUrl(Route.HOME);
      }
    }),
    map(() => true),
  );
  readonly contactForm = new FormGroup({
    password: new FormControl('', [
      (control: AbstractControl) => Validators.required(control),
      Validators.minLength(6),
    ]),
  });

  submit() {
    const password = this.contactForm.value.password;
    if (password) {
      this.store.updateHasGeoAccess(password);
    }
  }
}
