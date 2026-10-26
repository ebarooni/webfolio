import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { BookmarkStatusCallToAction } from './call-to-action';

describe('BookmarkStatusCallToAction', () => {
  let fixture: ComponentFixture<BookmarkStatusCallToAction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkStatusCallToAction],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkStatusCallToAction);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('uses a text button instead of a second badge', () => {
    const button = fixture.debugElement.query(By.css('.store-button'));
    const link = button.nativeElement as HTMLAnchorElement;

    expect(fixture.debugElement.query(By.css('.store-badge'))).toBeNull();
    expect(link.getAttribute('aria-label')).toBe('Get it on the Mac App Store');
    expect(link.getAttribute('href')).toBeNull();
    expect(link.getAttribute('role')).toBe('button');
  });
});
