import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ArrowIcon, type ArrowDirection } from './arrow-icon';

describe('ArrowIcon', () => {
  let fixture: ComponentFixture<ArrowIcon>;

  function host(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  function show(direction: ArrowDirection): void {
    fixture.componentRef.setInput('direction', direction);
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrowIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(ArrowIcon);
    fixture.detectChanges();
  });

  it('points forward without a rotation', () => {
    expect(host().querySelector('svg')?.getAttribute('aria-hidden')).toBe(
      'true',
    );
    expect(host().className).not.toContain('rotate');
  });

  it('turns to point back', () => {
    show('back');

    expect(host().classList).toContain('rotate-180');
  });

  it('turns to point down', () => {
    show('down');

    expect(host().classList).toContain('rotate-90');
  });

  it('turns to point to an external page', () => {
    show('external');

    expect(host().classList).toContain('-rotate-45');
  });
});
