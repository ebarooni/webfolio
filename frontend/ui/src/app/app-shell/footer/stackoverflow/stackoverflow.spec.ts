import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { Stackoverflow } from './stackoverflow';

describe('Stackoverflow', () => {
  let component: Stackoverflow;
  let fixture: ComponentFixture<Stackoverflow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stackoverflow],
    }).compileComponents();

    fixture = TestBed.createComponent(Stackoverflow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the svg and the lines path', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const host: HTMLElement = fixture.nativeElement;

    const svg = host.querySelector('svg.so-icon');
    expect(svg).toBeTruthy();

    const lines = host.querySelector('path.so-lines');
    expect(lines).toBeTruthy();
  });
});
