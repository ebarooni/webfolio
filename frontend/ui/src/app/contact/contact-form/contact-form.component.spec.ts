import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { ContactFormComponent } from './contact-form.component';

describe('ContactFormComponent', () => {
  let fixture: ComponentFixture<ContactFormComponent>;
  let component: ContactFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not emit when invalid and should mark as touched', () => {
    const spy = vi.fn();
    component.formSubmitted.subscribe(spy);

    component.submit();

    expect(spy).not.toHaveBeenCalled();
    expect(component.contactForm.touched).toBe(true);
  });

  it('should emit sanitized payload and reset form', () => {
    const spy = vi.fn();
    component.formSubmitted.subscribe(spy);

    component.contactForm.setValue({
      name: "Max Mustermann",
      email: "max@mustermann.de",
      message: " Hello <b>world</b>\n\n",
    });

    component.submit();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      name: "Max Mustermann",
      email: "max@mustermann.de",
      message: "Hello world",
    });

    expect(component.contactForm.value).toEqual({
      name: '',
      email: '',
      message: '',
    });
  });
});
