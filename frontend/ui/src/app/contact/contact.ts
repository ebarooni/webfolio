import {
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    class: 'flex flex-col flex-1',
  },
})
export class ContactComponent {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  readonly isSubmitting = signal(false);

  submitForm(data: ContactFormData, modal: ModalComponent): void {
    if (this.isSubmitting()) return;

    this.isSubmitting.set(true);

    this.http
      .post('/api/v1/contact-form', data)
      .pipe(
        tap(() => {
          modal.showModal(
            'Message sent ✅',
            'Thanks for reaching out. I will get back to you soon.',
          );
        }),
        catchError(() => {
          modal.showModal(
            'Error ⚠️',
            'Submissions are currently disabled. Please reach out using one of the social links below.',
          );
          return of(null);
        }),
        finalize(() => this.isSubmitting.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
