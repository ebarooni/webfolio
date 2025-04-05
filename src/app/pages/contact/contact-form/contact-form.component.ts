import { Component, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';

export interface ContactFormData {
  email: string;
  message: string;
  name: string;
}

@Component({
  imports: [ReactiveFormsModule, NgClass],
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
  readonly formSubmitted = output<ContactFormData>();
  readonly contactForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  submit() {
    const email = this.contactForm.value.email;
    const name = this.contactForm.value.name;
    const message = this.contactForm.value.message;

    if (!email || !name || !message) {
      return;
    }

    this.formSubmitted.emit({ email, message, name });
    this.contactForm.reset({
      email: '',
      message: '',
      name: '',
    });
  }
}
