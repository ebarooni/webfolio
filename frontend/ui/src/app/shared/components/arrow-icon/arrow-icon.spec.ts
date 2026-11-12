import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';

import { ArrowIcon } from './arrow-icon';

describe('ArrowIcon', () => {
  it('should render a decorative icon', async () => {
    await TestBed.configureTestingModule({
      imports: [ArrowIcon],
    }).compileComponents();

    const fixture = TestBed.createComponent(ArrowIcon);
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('svg'))
      .nativeElement as SVGSVGElement;

    expect(icon.getAttribute('aria-hidden')).toBe('true');
  });
});
