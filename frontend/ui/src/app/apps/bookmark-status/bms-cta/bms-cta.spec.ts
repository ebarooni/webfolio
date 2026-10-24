import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { BmsCta } from './bms-cta';

describe('BmsCta', () => {
  let fixture: ComponentFixture<BmsCta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmsCta],
    }).compileComponents();

    fixture = TestBed.createComponent(BmsCta);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('uses a text button instead of a second badge', () => {
    const button = fixture.debugElement.query(By.css('.bms-btn-store'));
    const link = button.nativeElement as HTMLAnchorElement;

    expect(fixture.debugElement.query(By.css('.bms-badge'))).toBeNull();
    expect(link.getAttribute('aria-label')).toBe('Get it on the Mac App Store');
    expect(link.getAttribute('href')).toBe('APP_STORE_URL');
  });
});
