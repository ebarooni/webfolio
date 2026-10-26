import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { BookmarkStatusKeys } from './keys';

describe('BookmarkStatusKeys', () => {
  let fixture: ComponentFixture<BookmarkStatusKeys>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkStatusKeys],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkStatusKeys);
    fixture.componentRef.setInput('label', 'Option Shift B');
    fixture.componentRef.setInput('keys', ['⌥', '⇧', 'B']);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('exposes one accessible name for the shortcut', () => {
    const group = fixture.debugElement.query(By.css('.keys'));
    const element = group.nativeElement as HTMLSpanElement;
    const keys = fixture.debugElement.queryAll(By.css('.key'));

    expect(element.getAttribute('aria-label')).toBe('Option Shift B');
    expect(keys.length).toBe(3);
  });
});
