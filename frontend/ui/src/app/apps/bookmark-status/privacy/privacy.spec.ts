import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { BookmarkStatusPrivacy } from './privacy';

describe('BookmarkStatusPrivacy', () => {
  let fixture: ComponentFixture<BookmarkStatusPrivacy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkStatusPrivacy],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkStatusPrivacy);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders four on-device points', () => {
    const points = fixture.debugElement.queryAll(By.css('.item'));
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(points.length).toBe(4);
    expect(text).toContain('It isn’t encrypted');
    expect(text.toLowerCase()).not.toContain('icloud');
  });
});
