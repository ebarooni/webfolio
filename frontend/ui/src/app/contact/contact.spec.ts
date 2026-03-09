import { Component, input, output } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { Contact } from './contact';
import { ContactFormData } from './contact-form/contact-form';
import { Hero } from '../shared/components/hero/hero';
import { ContactForm } from './contact-form/contact-form';
import { Modal } from './modal/modal';

@Component({
  selector: 'app-hero',
  template: '<ng-content />',
})
class MockHero {
  readonly backgroundClass = input('');
  readonly titleClass = input('');
  readonly subtitleClass = input('');
}

@Component({
  selector: 'app-contact-form',
  template: '',
})
class MockContactForm {
  readonly isSubmitting = input(false);
  readonly formSubmitted = output<ContactFormData>();
}

@Component({
  selector: 'app-modal',
  template: '',
})
class MockModal {
  showModal(title: string, message: string): void {
    void title;
    void message;
  }
}

describe('Contact', () => {
  let fixture: ComponentFixture<Contact>;
  let component: Contact;
  let httpTestingController: HttpTestingController;

  beforeAll(() => {
    TestBed.resetTestingModule();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
      .overrideComponent(Contact, {
        remove: {
          imports: [Hero, ContactForm, Modal],
        },
        add: {
          imports: [MockHero, MockContactForm, MockModal],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
    vi.restoreAllMocks();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('submits the form successfully and shows a success modal', () => {
    const data: ContactFormData = {
      email: 'max@example.com',
      message: 'Hello there',
      name: 'Max Mustermann',
    };
    const modalDebugElement = fixture.debugElement.query(
      By.directive(MockModal),
    );
    const modalComponent = modalDebugElement.componentInstance as Modal;
    const showModalSpy = vi.spyOn(modalComponent, 'showModal');

    component.submitForm(data, modalComponent);
    fixture.detectChanges();

    expect(component.isSubmitting()).toBe(true);

    const request = httpTestingController.expectOne('/api/v1/contact-form');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(data);

    request.flush({});
    fixture.detectChanges();

    expect(showModalSpy).toHaveBeenCalledWith(
      'Message sent ✅',
      'Thanks for reaching out. I will get back to you soon.',
    );
    expect(component.isSubmitting()).toBe(false);
  });

  it('shows an error modal when the submission fails', () => {
    const data: ContactFormData = {
      email: 'max@example.com',
      message: 'Hello there',
      name: 'Max Mustermann',
    };
    const modalDebugElement = fixture.debugElement.query(
      By.directive(MockModal),
    );
    const modalComponent = modalDebugElement.componentInstance as Modal;
    const showModalSpy = vi.spyOn(modalComponent, 'showModal');

    component.submitForm(data, modalComponent);

    const request = httpTestingController.expectOne('/api/v1/contact-form');
    request.flush('Request failed', {
      status: 500,
      statusText: 'Server Error',
    });
    fixture.detectChanges();

    expect(showModalSpy).toHaveBeenCalledWith(
      'Error ⚠️',
      'Submissions are currently disabled. Please reach out using one of the social links below.',
    );
    expect(component.isSubmitting()).toBe(false);
  });

  it('does not submit again while a submission is already in progress', () => {
    const data: ContactFormData = {
      email: 'max@example.com',
      message: 'Hello there',
      name: 'Max Mustermann',
    };
    const modalDebugElement = fixture.debugElement.query(
      By.directive(MockModal),
    );
    const modalComponent = modalDebugElement.componentInstance as Modal;

    component.isSubmitting.set(true);

    component.submitForm(data, modalComponent);

    httpTestingController.expectNone('/api/v1/contact-form');
  });

  it('passes the submitting state to the contact form component', () => {
    const contactFormDebugElement = fixture.debugElement.query(
      By.directive(MockContactForm),
    );
    const contactFormComponent =
      contactFormDebugElement.componentInstance as MockContactForm;

    expect(contactFormComponent.isSubmitting()).toBe(false);

    const modalDebugElement = fixture.debugElement.query(
      By.directive(MockModal),
    );
    const modalComponent = modalDebugElement.componentInstance as Modal;

    component.submitForm(
      {
        email: 'max@example.com',
        message: 'Hello there',
        name: 'Max Mustermann',
      },
      modalComponent,
    );
    fixture.detectChanges();

    expect(contactFormComponent.isSubmitting()).toBe(true);

    const request = httpTestingController.expectOne('/api/v1/contact-form');
    request.flush({});
    fixture.detectChanges();

    expect(contactFormComponent.isSubmitting()).toBe(false);
  });

  it('submits the emitted form data from the contact form component with the modal instance', () => {
    const submitFormSpy = vi
      .spyOn(component, 'submitForm')
      .mockImplementation(() => undefined);

    const contactFormDebugElement = fixture.debugElement.query(
      By.directive(MockContactForm),
    );
    const contactFormComponent =
      contactFormDebugElement.componentInstance as MockContactForm;
    const modalDebugElement = fixture.debugElement.query(
      By.directive(MockModal),
    );
    const modalComponent = modalDebugElement.componentInstance as MockModal;

    const data: ContactFormData = {
      email: 'max@example.com',
      message: 'Hello there',
      name: 'Max Mustermann',
    };

    contactFormComponent.formSubmitted.emit(data);

    expect(submitFormSpy).toHaveBeenCalledWith(data, modalComponent);
  });
});
