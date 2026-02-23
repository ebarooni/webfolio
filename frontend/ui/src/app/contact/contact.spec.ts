import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { ContactComponent } from './contact';
import { ModalComponent } from '../components/modal/modal.component';
import { ContactFormData } from './contact-form/contact-form.component';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;
  let component: ContactComponent;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ContactComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show success modal on successful submit', () => {
    const modal = { showModal: vi.fn() } as unknown as ModalComponent;

    const payload: ContactFormData = {
      email: 'max@mustermann.de',
      name: 'Max Mustermann',
      message: 'Hello',
    };

    component.submitForm(payload, modal);

    const req = httpMock.expectOne('/api/v1/contact-form');
    expect(req.request.method).toBe('POST');
    expect(component.isSubmitting()).toBe(true);

    req.flush({});
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(modal.showModal).toHaveBeenCalledWith(
      'Message sent ✅',
      'Thanks for reaching out. I will get back to you soon.',
    );
    expect(component.isSubmitting()).toBe(false);
  });

  it('should show error modal on failed submit', () => {
    const modal = { showModal: vi.fn() } as unknown as ModalComponent;

    component.submitForm(
      { email: 'a@b.com', name: 'Max Mustermann', message: 'Hello' },
      modal,
    );

    const req = httpMock.expectOne('/api/v1/contact-form');
    req.flush(
      { message: 'disabled' },
      { status: 503, statusText: 'Service Unavailable' },
    );

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(modal.showModal).toHaveBeenCalledWith(
      'Error ⚠️',
      'Submissions are currently disabled. Please reach out using one of the social links below.',
    );
    expect(component.isSubmitting()).toBe(false);
  });
});
