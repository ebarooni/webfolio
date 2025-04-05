import { Component, inject } from '@angular/core';
import {
  ContactFormComponent,
  ContactFormData,
} from './contact-form/contact-form.component';
import { BaseLayoutComponent } from '../../layouts/base-layout/base-layout.component';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { HeroComponent } from '../../components/hero/hero.component';
import { httpsCallable } from 'firebase/functions';

@Component({
  imports: [BaseLayoutComponent, HeroComponent, ContactFormComponent],
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  private readonly firebase = inject(FirebaseService);

  submitForm(data: ContactFormData): void {
    httpsCallable(
      this.firebase.functions,
      'sendFormToTelegram',
    )(data).catch((error: unknown) => {
      console.warn(error);
    });
  }
}
