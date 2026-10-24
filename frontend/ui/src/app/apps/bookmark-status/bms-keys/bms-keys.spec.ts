import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { BmsKeys } from './bms-keys';

describe('BmsKeys', () => {
  let fixture: ComponentFixture<BmsKeys>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmsKeys],
    }).compileComponents();

    fixture = TestBed.createComponent(BmsKeys);
    fixture.componentRef.setInput('label', 'Option Shift B');
    fixture.componentRef.setInput('keys', ['⌥', '⇧', 'B']);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('exposes one accessible name for the shortcut', () => {
    const group = fixture.debugElement.query(By.css('.bms-keys'));
    const element = group.nativeElement as HTMLSpanElement;
    const keys = fixture.debugElement.queryAll(By.css('.bms-kbd'));

    expect(element.getAttribute('aria-label')).toBe('Option Shift B');
    expect(keys.length).toBe(3);
  });
});
