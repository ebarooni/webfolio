import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';
import { Open } from './open';

describe('Open', () => {
  it('should create and render an svg', async () => {
    await TestBed.configureTestingModule({
      imports: [Open],
    }).compileComponents();

    const fixture = TestBed.createComponent(Open);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.debugElement.query(By.css('svg'))).toBeTruthy();
  });
});
