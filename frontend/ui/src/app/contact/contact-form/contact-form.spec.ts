import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { localizationTestingModule } from '../../../testing/localization-testing';
import { ContactForm, ContactFormData } from './contact-form';

describe('ContactForm', () => {
  const validValue = {
    email: 'max@example.com',
    message: '  Hi <b>there</b> 😀 \n  next\tline  ',
    name: 'Max Mustermann',
  };

  let fixture: ComponentFixture<ContactForm>;
  let component: ContactForm;

  function submitButton(): HTMLButtonElement {
    return fixture.debugElement.query(By.css('button[type="submit"]'))
      .nativeElement as HTMLButtonElement;
  }

  function errorTexts(): string[] {
    return fixture.debugElement
      .queryAll(By.css('.field-error'))
      .map((error) => (error.nativeElement as HTMLElement).textContent.trim())
      .filter((text) => text.length > 0);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactForm, localizationTestingModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit sanitized data and keep the text until it is sent', () => {
    const emitSpy = vi.spyOn(component.formSubmitted, 'emit');
    const expectedPayload: ContactFormData = {
      email: 'max@example.com',
      message: 'Hi <b>there</b> 😀\nnext line',
      name: 'Max Mustermann',
    };

    component.contactForm.setValue(validValue);
    component.submit();

    expect(emitSpy).toHaveBeenCalledWith(expectedPayload);
    expect(component.contactForm.getRawValue()).toEqual(validValue);
  });

  it.each([
    'Zoë Daniël',
    'François Müller',
    'Łukasz Nowak',
    'Søren Kierkegaard',
    'D’Angelo',
    "Dr. Jane van 't Hof",
    '李小龙',
  ])('should accept the name %s', (name) => {
    component.nameControl.setValue(name);

    expect(component.nameControl.valid).toBe(true);
  });

  it.each(['A', 'R2-D2', '-Max', 'Max <b>', 'x'.repeat(101)])(
    'should reject the name %s',
    (name) => {
      component.nameControl.setValue(name);

      expect(component.nameControl.valid).toBe(false);
    },
  );

  it('should clear the form after the message was sent', () => {
    component.contactForm.setValue(validValue);

    fixture.componentRef.setInput('status', 'sent');
    fixture.detectChanges();

    expect(component.contactForm.getRawValue()).toEqual({
      email: '',
      message: '',
      name: '',
    });
  });

  it('should keep the text when the message was not sent', () => {
    component.contactForm.setValue(validValue);

    fixture.componentRef.setInput('status', 'failed');
    fixture.detectChanges();

    expect(component.contactForm.getRawValue()).toEqual(validValue);
  });

  it('should show an error for every invalid field and not emit', () => {
    const emitSpy = vi.spyOn(component.formSubmitted, 'emit');

    expect(errorTexts()).toEqual([]);

    component.submit();
    fixture.detectChanges();

    expect(emitSpy).not.toHaveBeenCalled();
    expect(errorTexts()).toEqual([
      'Enter your name with 2 to 100 letters.',
      'Enter a valid email address.',
      'Write a message with 2 to 1000 characters.',
    ]);
  });

  it('should connect an invalid field to its error for screen readers', () => {
    component.submit();
    fixture.detectChanges();

    const nameField = fixture.debugElement.query(By.css('#contact-name'))
      .nativeElement as HTMLInputElement;

    expect(nameField.getAttribute('aria-invalid')).toBe('true');
    expect(nameField.getAttribute('aria-describedby')).toBe(
      'contact-name-error',
    );
  });

  it('should not emit while a submission is in progress', () => {
    const emitSpy = vi.spyOn(component.formSubmitted, 'emit');

    fixture.componentRef.setInput('isSubmitting', true);
    fixture.detectChanges();
    component.contactForm.setValue(validValue);
    component.submit();

    expect(emitSpy).not.toHaveBeenCalled();
    expect(submitButton().disabled).toBe(true);
    expect(submitButton().textContent.trim()).toBe('Sending');
  });

  it('should show the length of the message', () => {
    component.messageControl.setValue('Hello');
    fixture.detectChanges();

    const counter = fixture.debugElement.query(
      By.css('textarea ~ div .meta-label'),
    ).nativeElement as HTMLElement;

    expect(counter.textContent.trim()).toBe('5/1000');
  });

  it.each([
    { status: 'sent', expected: 'Message sent.' },
    { status: 'failed', expected: 'The message was not sent.' },
  ] as const)('should announce the $status status', ({ status, expected }) => {
    fixture.componentRef.setInput('status', status);
    fixture.detectChanges();

    const region = fixture.debugElement.query(By.css('[aria-live]'))
      .nativeElement as HTMLElement;

    expect(region.textContent).toContain(expected);
  });
});
