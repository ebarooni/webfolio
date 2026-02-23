import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { Linkedin } from './linkedin';

describe('Linkedin', () => {
  let component: Linkedin;
  let fixture: ComponentFixture<Linkedin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Linkedin],
    }).compileComponents();

    fixture = TestBed.createComponent(Linkedin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the svg and both logo paths', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const host: HTMLElement = fixture.nativeElement;

    const svg = host.querySelector('svg.li-icon');
    expect(svg).toBeTruthy();

    const fills = host.querySelectorAll('path.li-fill');
    expect(fills.length).toBe(2);
  });
});
