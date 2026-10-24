import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { BmsPrivacy } from './bms-privacy';

describe('BmsPrivacy', () => {
  let fixture: ComponentFixture<BmsPrivacy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmsPrivacy],
    }).compileComponents();

    fixture = TestBed.createComponent(BmsPrivacy);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders four on-device points', () => {
    const points = fixture.debugElement.queryAll(By.css('.bms-p-item'));
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(points.length).toBe(4);
    expect(text).toContain('It isn’t encrypted');
    expect(text.toLowerCase()).not.toContain('icloud');
  });
});
