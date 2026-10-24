import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { BmsFaq } from './bms-faq';

describe('BmsFaq', () => {
  let fixture: ComponentFixture<BmsFaq>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmsFaq],
    }).compileComponents();

    fixture = TestBed.createComponent(BmsFaq);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('opens only the first of seven questions', () => {
    const details = fixture.debugElement.queryAll(By.css('details'));
    const first = details[0]?.nativeElement as HTMLDetailsElement;
    const last = details[6]?.nativeElement as HTMLDetailsElement;

    expect(details.length).toBe(7);
    expect(first.open).toBe(true);
    expect(last.textContent).toContain('PRICE_TBD');
    expect(last.open).toBe(false);
  });
});
