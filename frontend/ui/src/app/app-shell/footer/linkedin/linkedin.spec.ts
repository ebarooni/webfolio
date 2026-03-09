import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Linkedin } from './linkedin';

describe('Linkedin', () => {
  let fixture: ComponentFixture<Linkedin>;
  let component: Linkedin;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Linkedin],
    }).compileComponents();

    fixture = TestBed.createComponent(Linkedin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the linkedin svg icon', () => {
    const svgDebugElement = fixture.debugElement.query(By.css('svg'));
    const svgElement = svgDebugElement.nativeElement as SVGSVGElement;

    expect(svgElement).toBeTruthy();
    expect(svgElement.getAttribute('xmlns')).toBe('http://www.w3.org/2000/svg');
    expect(svgElement.getAttribute('height')).toBe('25');
    expect(svgElement.getAttribute('width')).toBe('28');
    expect(svgElement.getAttribute('viewBox')).toBe('-5 -5 74 74');
    expect(svgElement.getAttribute('fill')).toBe('none');
    expect(svgElement.getAttribute('preserveAspectRatio')).toBe(
      'xMidYMid meet',
    );
    expect(svgElement.classList.contains('li-icon')).toBe(true);
  });

  it('should render two linkedin path elements', () => {
    const pathDebugElements = fixture.debugElement.queryAll(By.css('svg path'));
    expect(pathDebugElements.length).toBe(2);
  });

  it('should render linkedin fill paths', () => {
    const pathDebugElements = fixture.debugElement.queryAll(
      By.css('svg path.li-fill'),
    );

    expect(pathDebugElements.length).toBe(2);

    const firstPath = pathDebugElements[0].nativeElement as SVGPathElement;
    const secondPath = pathDebugElements[1].nativeElement as SVGPathElement;

    expect(firstPath.getAttribute('fill')).toBe('#0a66c2');
    expect(secondPath.getAttribute('fill')).toBe('#0a66c2');

    expect(firstPath.getAttribute('d')).toBeTruthy();
    expect(secondPath.getAttribute('d')).toBeTruthy();
  });
});
