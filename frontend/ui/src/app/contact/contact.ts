import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, catchError, of } from 'rxjs';

import {
  ContactFormComponent,
  ContactFormData,
} from './contact-form/contact-form.component';
import { HeroComponent } from '../components/hero/hero.component';
import { ModalComponent } from '../components/modal/modal.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  imports: [HeroComponent, ContactFormComponent, ModalComponent],
  host: {
    class: 'flex flex-col grow-1'
  },
})
export class ContactComponent {
  private readonly http = inject(HttpClient);

  submitForm(data: ContactFormData, modal: ModalComponent): void {
    this.http
      .post('/api/v1/contact-form', data)
      .pipe(
        catchError(() => of(null)),
        finalize(() => {
          modal.showModal(
            'Error ⚠️',
            'Submissions are currently disabled. Please reach out using one of the social links below.',
          );
        }),
      )
      .subscribe();
  }
}
