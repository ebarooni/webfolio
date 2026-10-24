import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { BmsBento } from './bms-bento';

describe('BmsBento', () => {
  let fixture: ComponentFixture<BmsBento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmsBento],
    }).compileComponents();

    fixture = TestBed.createComponent(BmsBento);
    fixture.componentRef.setInput('theme', 'light');
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders six feature cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('.bms-card'));
    const heading = fixture.debugElement.query(By.css('h2'));
    const title = heading.nativeElement as HTMLHeadingElement;

    expect(cards.length).toBe(6);
    expect(title.textContent).toContain('One small button.');
  });

  it('renders search filters from the copy', () => {
    const codes = fixture.debugElement.queryAll(By.css('.bms-checks code'));
    const labels = codes.map((code) => {
      return (code.nativeElement as HTMLElement).textContent;
    });

    expect(labels).toEqual(['site:', 'host:']);
  });
});
