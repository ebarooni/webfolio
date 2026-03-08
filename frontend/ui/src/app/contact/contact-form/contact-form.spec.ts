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

import { ContactForm } from './contact-form';
import { ContactFormData } from './contact-form';

describe('ContactForm', () => {
  let fixture: ComponentFixture<ContactForm>;
  let component: ContactForm;

  beforeAll(() => {
    TestBed.resetTestingModule();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactForm);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('isSubmitting', false);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('emits sanitized form data and resets the form when the form is valid', () => {
    const emitSpy = vi.spyOn(component.formSubmitted, 'emit');

    component.contactForm.setValue({
      email: 'max@example.com',
      message: '  Hi <b>there</b> 😀 \n  next\tline  ',
      name: 'Max Mustermann',
    });

    component.submit();

    const expectedPayload: ContactFormData = {
      email: 'max@example.com',
      message: 'Hi there\nnext line',
      name: 'Max Mustermann',
    };

    expect(emitSpy).toHaveBeenCalledWith(expectedPayload);
    expect(component.contactForm.getRawValue()).toEqual({
      email: '',
      message: '',
      name: '',
    });
  });

  it('marks all controls as touched and does not emit when the form is invalid', () => {
    const emitSpy = vi.spyOn(component.formSubmitted, 'emit');

    component.contactForm.setValue({
      email: '',
      message: '',
      name: '',
    });

    component.submit();

    expect(emitSpy).not.toHaveBeenCalled();
    expect(component.nameControl.touched).toBe(true);
    expect(component.emailControl.touched).toBe(true);
    expect(component.messageControl.touched).toBe(true);
  });

  it('does not emit when submission is already in progress', () => {
    const emitSpy = vi.spyOn(component.formSubmitted, 'emit');

    fixture.componentRef.setInput('isSubmitting', true);
    component.contactForm.setValue({
      email: 'max@example.com',
      message: 'Hello there',
      name: 'Max Mustermann',
    });

    component.submit();

    expect(emitSpy).not.toHaveBeenCalled();
    expect(component.contactForm.getRawValue()).toEqual({
      email: 'max@example.com',
      message: 'Hello there',
      name: 'Max Mustermann',
    });
  });

  it('disables the submit button when the form is invalid', () => {
    component.contactForm.setValue({
      email: '',
      message: '',
      name: '',
    });
    fixture.detectChanges();

    const buttonDebugElement = fixture.debugElement.query(
      By.css('button[type="submit"]'),
    );
    const buttonElement = buttonDebugElement.nativeElement as HTMLButtonElement;

    expect(buttonElement.disabled).toBe(true);
  });

  it('shows the current message length in the template', () => {
    component.messageControl.setValue('Hello');
    fixture.detectChanges();

    const labelDebugElement = fixture.debugElement.query(By.css('.label'));
    const labelElement = labelDebugElement.nativeElement as HTMLDivElement;

    expect(labelElement.textContent?.trim()).toBe(
      `5/${component.maxMessageLength}`,
    );
  });
});
