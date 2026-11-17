import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { Monogram } from './monogram';

describe('Monogram', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Monogram],
    }).compileComponents();
  });

  it('shows the initials and hides them from screen readers', () => {
    const fixture = TestBed.createComponent(Monogram);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;

    expect(host.textContent.trim()).toBe('EB');
    expect(host.getAttribute('aria-hidden')).toBe('true');
  });
});
