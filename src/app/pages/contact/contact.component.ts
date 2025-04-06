import { Component, inject } from '@angular/core';
import {
  ContactFormComponent,
  ContactFormData,
} from './contact-form/contact-form.component';
import { BaseLayoutComponent } from '../../layouts/base-layout/base-layout.component';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { HeroComponent } from '../../components/hero/hero.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { httpsCallable } from 'firebase/functions';

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
  private readonly firebase = inject(FirebaseService);

  submitForm(data: ContactFormData, modal: ModalComponent): void {
    httpsCallable(
      this.firebase.functions,
      'sendFormToTelegram',
    )(data)
      .then(() => {
        modal.showModal('Sent ✅', 'Your message was sent successfully!');
      })
      .catch((error: unknown) => {
        let message = 'Something went wrong. Please try again later.';
        if (error instanceof Error) {
          message = `${message}\n${error.message}`;
        }
        modal.showModal('Error ⚠️', message);
      });
  }
}
