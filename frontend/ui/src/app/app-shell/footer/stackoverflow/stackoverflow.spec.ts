import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Stackoverflow } from './stackoverflow';

describe('Stackoverflow', () => {
  let fixture: ComponentFixture<Stackoverflow>;
  let component: Stackoverflow;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stackoverflow],
    }).compileComponents();

    fixture = TestBed.createComponent(Stackoverflow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the stackoverflow svg icon', () => {
    const svgDebugElement = fixture.debugElement.query(By.css('svg'));
    const svgElement = svgDebugElement.nativeElement as SVGSVGElement;

    expect(svgElement).toBeTruthy();
    expect(svgElement.getAttribute('xmlns')).toBe('http://www.w3.org/2000/svg');
    expect(svgElement.getAttribute('height')).toBe('25');
    expect(svgElement.getAttribute('width')).toBe('28');
    expect(svgElement.getAttribute('viewBox')).toBe('0 0 104 124');
    expect(svgElement.getAttribute('fill')).toBe('none');
    expect(svgElement.getAttribute('preserveAspectRatio')).toBe(
      'xMidYMid meet',
    );
    expect(svgElement.classList.contains('so-icon')).toBe(true);
  });

  it('should render the base polygon', () => {
    const polygonDebugElement = fixture.debugElement.query(
      By.css('svg polygon'),
    );
    const polygonElement =
      polygonDebugElement.nativeElement as SVGPolygonElement;

    expect(polygonElement).toBeTruthy();
    expect(polygonElement.getAttribute('fill')).toBe('#BBC0C4');
    expect(polygonElement.getAttribute('points')).toBe(
      '88 80 99 80 99 124 0 124 0 80 11 80 11 113 88 113',
    );
  });

  it('should render the lines path', () => {
    const pathDebugElement = fixture.debugElement.query(
      By.css('svg path.so-lines'),
    );
    const pathElement = pathDebugElement.nativeElement as SVGPathElement;

    expect(pathElement).toBeTruthy();
    expect(pathElement.getAttribute('fill')).toBe('#F48024');
    expect(pathElement.getAttribute('fill-rule')).toBe('nonzero');
    expect(pathElement.getAttribute('d')).toBeTruthy();
  });

  it('should render one polygon and one path', () => {
    const polygonDebugElements = fixture.debugElement.queryAll(
      By.css('svg polygon'),
    );
    const pathDebugElements = fixture.debugElement.queryAll(By.css('svg path'));

    expect(polygonDebugElements.length).toBe(1);
    expect(pathDebugElements.length).toBe(1);
  });
});
