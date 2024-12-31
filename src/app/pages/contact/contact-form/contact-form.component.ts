import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
  readonly contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  submit() {
    console.log(this.contactForm.value);
    this.contactForm.reset({
      name: '',
      email: '',
      message: '',
    });
  }
}
