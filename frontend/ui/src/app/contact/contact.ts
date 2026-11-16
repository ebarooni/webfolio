import { HttpClient } from '@angular/common/http';
import { NgTemplateOutlet } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoDirective } from '@jsverse/transloco';
import { finalize } from 'rxjs';

import { SOCIAL_LINKS } from '../config/social-links';
import { ArrowIcon } from '../shared/components/arrow-icon/arrow-icon';
import {
  ContactForm,
  ContactFormData,
  SubmissionStatus,
} from './contact-form/contact-form';

@Component({
  selector: 'app-contact',
  imports: [ArrowIcon, ContactForm, NgTemplateOutlet, TranslocoDirective],
  templateUrl: './contact.html',
})
export class Contact {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  readonly links = SOCIAL_LINKS;
  readonly isSubmitting = signal(false);
  readonly status = signal<SubmissionStatus>('idle');

  submitForm(data: ContactFormData): void {
    if (this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);
    this.status.set('idle');

    this.http
      .post('/api/v1/contact-form', data)
      .pipe(
        finalize(() => {
          this.isSubmitting.set(false);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.status.set('sent');
        },
        error: () => {
          this.status.set('failed');
        },
      });
  }
}
