import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { StatusMessage } from './status-message';

describe('StatusMessage', () => {
  let fixture: ComponentFixture<StatusMessage>;

  function root(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusMessage],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusMessage);
    fixture.componentRef.setInput('tone', 'success');
    fixture.componentRef.setInput('title', 'Message sent');
    fixture.componentRef.setInput('body', 'I will reply soon.');
    fixture.detectChanges();
  });

  it('shows the title and the body', () => {
    expect(root().querySelector('strong')?.textContent).toBe('Message sent.');
    expect(root().textContent).toContain('I will reply soon.');
  });

  it('shows a check mark in the success color', () => {
    expect(root().querySelector('svg')?.classList).toContain('text-success');
    expect(root().querySelector('circle')).toBeNull();
  });

  it('shows a warning sign in the error color', () => {
    fixture.componentRef.setInput('tone', 'error');
    fixture.detectChanges();

    expect(root().querySelector('svg')?.classList).toContain('text-error');
    expect(root().querySelector('circle')).not.toBeNull();
  });
});
