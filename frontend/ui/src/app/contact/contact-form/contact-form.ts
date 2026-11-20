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
import { Button } from '../../shared/components/button/button';
import { FormField } from '../../shared/components/form-field/form-field';
import { StatusMessage } from '../../shared/components/status-message/status-message';

// A name starts with a letter of any script. Letters, marks, spaces,
// apostrophes, hyphens and periods can follow, as in "Daniël", "Łukasz",
// "D’Angelo" or "Dr. Jane van 't Hof". The backend also allows 100 characters.
const NAME_PATTERN = /^\p{L}[\p{L}\p{M}'’. -]*$/u;
const MAX_NAME_LENGTH = 100;

export type SubmissionStatus = 'idle' | 'sent' | 'failed';

export interface ContactFormData {
  email: string;
  message: string;
  name: string;
}

@Component({
  imports: [
    ArrowIcon,
    Button,
    FormField,
    ReactiveFormsModule,
    StatusMessage,
    TranslocoDirective,
  ],
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
        Validators.pattern(NAME_PATTERN),
        Validators.minLength(2),
        Validators.maxLength(MAX_NAME_LENGTH),
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
      .replace(/[^\S\r\n]+/g, ' ')
      .replace(/^[ \t]+|[ \t]+$/gm, '');

    this.formSubmitted.emit({ email, name, message: sanitizedMessage });
  }
}
