import {
  ContactFormComponent,
  ContactFormData,
} from './contact-form/contact-form.component';
import { BaseLayoutComponent } from '../../layouts/base-layout/base-layout.component';
import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  imports: [
    BaseLayoutComponent,
    HeroComponent,
    ContactFormComponent,
    ModalComponent,
  ],
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  submitForm(data: ContactFormData, modal: ModalComponent): void {
    modal.showModal(
      'Error ⚠️',
      'Submissions are currently disabled. Please reach out using one of the social links below.',
    );
  }
}
