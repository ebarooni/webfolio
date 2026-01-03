import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, output } from '@angular/core';
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
    email: new FormControl('', [
      (control: AbstractControl) => Validators.required(control),
      (control: AbstractControl) => Validators.email(control),
    ]),
    message: new FormControl('', [
      (control: AbstractControl) => Validators.required(control),
      Validators.minLength(2),
      Validators.maxLength(1000),
    ]),
    name: new FormControl('', [
      (control: AbstractControl) => Validators.required(control),
      Validators.pattern(/^[a-zA-ZäöüÄÖÜß' -]{2,50}$/),
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
  });

  submit() {
    const email = this.contactForm.value.email;
    const name = this.contactForm.value.name;
    const message = this.contactForm.value.message;

    if (!email || !name || !message) {
      return;
    }

    const sanitizedMessage = message
      .trim()
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '') // remove control chars but keep \n and \r
      .replace(/<[^>]*>/g, '') // remove HTML tags
      .replace(/[\u{1F600}-\u{1F6FF}]/gu, '') // remove emojis (optional)
      .replace(/[^\S\r\n]+/g, ' ') // collapse horizontal whitespace (but keep newlines)
      .replace(/^[ \t]+|[ \t]+$/gm, ''); // trim spaces at start/end of each line

    this.formSubmitted.emit({ email, message: sanitizedMessage, name });
    this.contactForm.reset({
      email: '',
      message: '',
      name: '',
    });
  }
}
