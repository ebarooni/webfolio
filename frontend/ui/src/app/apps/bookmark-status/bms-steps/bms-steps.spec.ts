import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { BmsSteps } from './bms-steps';

describe('BmsSteps', () => {
  let fixture: ComponentFixture<BmsSteps>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmsSteps],
    }).compileComponents();

    fixture = TestBed.createComponent(BmsSteps);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders three setup steps', () => {
    const steps = fixture.debugElement.queryAll(By.css('.bms-step'));
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(steps.length).toBe(3);
    expect(text).toContain('Bookmarks.plist');
    expect(text).toContain('updates as you switch tabs');
  });
});
