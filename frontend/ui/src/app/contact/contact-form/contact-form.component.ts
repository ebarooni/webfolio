import { Component, inject, input, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

export interface ContactFormData {
  email: string;
  message: string;
  name: string;
}

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly isSubmitting = input(false);
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

  readonly message = toSignal(this.contactForm.controls.message.valueChanges, {
    initialValue: '',
  });

  submit(): void {
    if (this.isSubmitting()) return;

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

    this.contactForm.reset({
      email: '',
      message: '',
      name: '',
    });
  }
}
