import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { FormField } from './form-field';

@Component({
  imports: [FormField],
  template: `
    <app-form-field #field label="Email" controlId="email" [error]="error()">
      <input
        id="email"
        [attr.aria-describedby]="error() ? field.errorId() : null"
      />
      <p appFieldAside>0/1000</p>
    </app-form-field>
  `,
})
class FormFieldHost {
  readonly error = signal('');
}

describe('FormField', () => {
  let fixture: ComponentFixture<FormFieldHost>;

  function root(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldHost],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldHost);
    fixture.detectChanges();
  });

  it('connects the label to the control', () => {
    const label = root().querySelector('label');

    expect(label?.textContent.trim()).toBe('Email');
    expect(label?.htmlFor).toBe('email');
  });

  it('shows the projected hint and no error text without an error', () => {
    expect(root().querySelector('[appFieldAside]')?.textContent).toBe('0/1000');
    expect(root().querySelector('.field-error')).toBeNull();
  });

  it('shows the error text with an id that the control refers to', () => {
    fixture.componentInstance.error.set('Enter a valid email address.');
    fixture.detectChanges();

    const error = root().querySelector('.field-error');

    expect(error?.textContent.trim()).toBe('Enter a valid email address.');
    expect(error?.id).toBe('email-error');
    expect(
      root().querySelector('input')?.getAttribute('aria-describedby'),
    ).toBe('email-error');
  });
});
