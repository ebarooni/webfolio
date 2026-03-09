import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Github } from './github';

describe('Github', () => {
  let fixture: ComponentFixture<Github>;
  let component: Github;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Github],
    }).compileComponents();

    fixture = TestBed.createComponent(Github);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the github svg icon', () => {
    const svgDebugElement = fixture.debugElement.query(By.css('svg'));
    const svgElement = svgDebugElement.nativeElement as SVGSVGElement;

    expect(svgElement).toBeTruthy();
    expect(svgElement.getAttribute('xmlns')).toBe('http://www.w3.org/2000/svg');
    expect(svgElement.getAttribute('viewBox')).toBe('0 0 100 100');
    expect(svgElement.getAttribute('height')).toBe('24');
    expect(svgElement.getAttribute('width')).toBe('25');
    expect(svgElement.getAttribute('fill')).toBe('none');
    expect(svgElement.classList.contains('gh-icon')).toBe(true);
  });

  it('should render the octocat path', () => {
    const pathDebugElement = fixture.debugElement.query(By.css('svg path'));
    const pathElement = pathDebugElement.nativeElement as SVGPathElement;

    expect(pathElement).toBeTruthy();
    expect(pathElement.getAttribute('fill')).toBe('#24292f');
    expect(pathElement.getAttribute('fill-rule')).toBe('evenodd');
    expect(pathElement.getAttribute('clip-rule')).toBe('evenodd');
    expect(pathElement.classList.contains('gh-octocat')).toBe(true);
    expect(pathElement.getAttribute('d')).toBeTruthy();
  });
});
