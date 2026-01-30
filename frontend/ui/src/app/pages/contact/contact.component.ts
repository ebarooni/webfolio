import { Component, inject } from '@angular/core';
import {
  ContactFormComponent,
  ContactFormData,
} from './contact-form/contact-form.component';
import { BaseLayoutComponent } from '../../layouts/base-layout/base-layout.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { HttpClient } from '@angular/common/http';
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
  private readonly http = inject(HttpClient);

  submitForm(data: ContactFormData, modal: ModalComponent): void {
    this.http.post('/api/v1/contact-form', data).subscribe();

    modal.showModal(
      'Error ⚠️',
      'Submissions are currently disabled. Please reach out using one of the social links below.',
    );
  }
}
