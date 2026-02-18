import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';
import { OpenComponent } from './open.component';

describe('OpenComponent', () => {
  it('should create and render an svg', async () => {
    await TestBed.configureTestingModule({
      imports: [OpenComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(OpenComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.debugElement.query(By.css('svg'))).toBeTruthy();
  });
});
