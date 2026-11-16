import { Component, effect, inject, input, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';

import { ArrowIcon } from '../../shared/components/arrow-icon/arrow-icon';

export type SubmissionStatus = 'idle' | 'sent' | 'failed';

export interface ContactFormData {
  email: string;
  message: string;
  name: string;
}

@Component({
  imports: [ArrowIcon, ReactiveFormsModule, TranslocoDirective],
  selector: 'app-contact-form',
  templateUrl: './contact-form.html',
})
export class ContactForm {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly isSubmitting = input(false);
  readonly status = input<SubmissionStatus>('idle');
  readonly formSubmitted = output<ContactFormData>();

  readonly maxMessageLength = 1000;

  readonly contactForm = this.fb.group({
    name: this.fb.control('', {
      validators: [
        (control) => Validators.required(control),
        Validators.pattern(/^[a-zA-ZäöüÄÖÜß' -]{2,50}$/),
        Validators.minLength(2),
        Validators.maxLength(50),
      ],
      updateOn: 'blur',
    }),
    email: this.fb.control('', {
      validators: [
        (control) => Validators.required(control),
        (control) => Validators.email(control),
      ],
      updateOn: 'blur',
    }),
    message: this.fb.control('', {
      validators: [
        (control) => Validators.required(control),
        Validators.minLength(2),
        Validators.maxLength(this.maxMessageLength),
      ],
    }),
  });

  readonly nameControl = this.contactForm.controls.name;
  readonly emailControl = this.contactForm.controls.email;
  readonly messageControl = this.contactForm.controls.message;

  readonly message = toSignal(this.messageControl.valueChanges, {
    initialValue: '',
  });

  constructor() {
    // The text stays in the form until the server has accepted it.
    effect(() => {
      if (this.status() === 'sent') {
        this.contactForm.reset({ email: '', message: '', name: '' });
      }
    });
  }

  isInvalid(control: AbstractControl): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  submit(): void {
    if (this.isSubmitting()) {
      return;
    }

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const { email, name, message } = this.contactForm.getRawValue();

    const sanitizedMessage = message
      .trim()
      // eslint-disable-next-line no-control-regex
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
      .replace(/<[^>]*>/g, '')
      .replace(/[\u{1F600}-\u{1F6FF}]/gu, '')
      .replace(/[^\S\r\n]+/g, ' ')
      .replace(/^[ \t]+|[ \t]+$/gm, '');

    this.formSubmitted.emit({ email, name, message: sanitizedMessage });
  }
}
