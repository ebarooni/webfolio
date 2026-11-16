import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { localizationTestingModule } from '../../testing/localization-testing';
import { SOCIAL_LINKS } from '../config/social-links';
import { Contact } from './contact';
import { ContactForm, ContactFormData } from './contact-form/contact-form';

describe('Contact', () => {
  const data: ContactFormData = {
    email: 'max@example.com',
    message: 'Hello',
    name: 'Max Mustermann',
  };

  let fixture: ComponentFixture<Contact>;
  let httpTestingController: HttpTestingController;

  function form(): ContactForm {
    return fixture.debugElement.query(By.directive(ContactForm))
      .componentInstance as ContactForm;
  }

  function submit(): void {
    form().formSubmitted.emit(data);
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact, localizationTestingModule()],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should show the headline of the screen', () => {
    const headline = fixture.debugElement.query(By.css('h1'))
      .nativeElement as HTMLElement;

    expect(headline.textContent.trim()).toBe(
      'Want to work together, or just say hello?',
    );
  });

  it('should list every profile as a safe external link', () => {
    const links = fixture.debugElement
      .queryAll(By.css('section.lg\\:hidden a'))
      .map((link) => link.nativeElement as HTMLAnchorElement);

    expect(links.map((link) => link.getAttribute('href'))).toEqual(
      SOCIAL_LINKS.map((link) => link.href),
    );
    expect(links.every((link) => link.rel.includes('noopener'))).toBe(true);
  });

  it('should send the form data and report success', () => {
    submit();

    expect(form().isSubmitting()).toBe(true);

    const request = httpTestingController.expectOne('/api/v1/contact-form');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(data);

    request.flush({});
    fixture.detectChanges();

    expect(form().isSubmitting()).toBe(false);
    expect(form().status()).toBe('sent');
  });

  it('should report a failure when the server refuses the message', () => {
    submit();

    httpTestingController
      .expectOne('/api/v1/contact-form')
      .flush(null, { status: 503, statusText: 'Service Unavailable' });
    fixture.detectChanges();

    expect(form().isSubmitting()).toBe(false);
    expect(form().status()).toBe('failed');
  });

  it('should not send a second request while one is in progress', () => {
    submit();
    submit();

    httpTestingController.expectOne('/api/v1/contact-form').flush({});
  });
});
