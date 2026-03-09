import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Gitlab } from './gitlab';

describe('Gitlab', () => {
  let fixture: ComponentFixture<Gitlab>;
  let component: Gitlab;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gitlab],
    }).compileComponents();

    fixture = TestBed.createComponent(Gitlab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the gitlab svg icon', () => {
    const svgDebugElement = fixture.debugElement.query(By.css('svg'));
    const svgElement = svgDebugElement.nativeElement as SVGSVGElement;

    expect(svgElement).toBeTruthy();
    expect(svgElement.getAttribute('xmlns')).toBe('http://www.w3.org/2000/svg');
    expect(svgElement.getAttribute('viewBox')).toBe('0 0 25 24');
    expect(svgElement.getAttribute('height')).toBe('24');
    expect(svgElement.getAttribute('width')).toBe('25');
    expect(svgElement.getAttribute('fill')).toBe('none');
    expect(svgElement.classList.contains('gl-icon')).toBe(true);
  });

  it('should render the forehead path', () => {
    const pathDebugElement = fixture.debugElement.query(
      By.css('svg path.gl-forehead'),
    );
    const pathElement = pathDebugElement.nativeElement as SVGPathElement;

    expect(pathElement).toBeTruthy();
    expect(pathElement.getAttribute('fill')).toBe('#E24329');
    expect(pathElement.getAttribute('d')).toBeTruthy();
  });

  it('should render the right cheek path', () => {
    const pathDebugElement = fixture.debugElement.query(
      By.css('svg path.gl-right-cheek'),
    );
    const pathElement = pathDebugElement.nativeElement as SVGPathElement;

    expect(pathElement).toBeTruthy();
    expect(pathElement.getAttribute('fill')).toBe('#FC6D26');
    expect(pathElement.getAttribute('d')).toBeTruthy();
  });

  it('should render the chin path', () => {
    const pathDebugElement = fixture.debugElement.query(
      By.css('svg path.gl-chin'),
    );
    const pathElement = pathDebugElement.nativeElement as SVGPathElement;

    expect(pathElement).toBeTruthy();
    expect(pathElement.getAttribute('fill')).toBe('#FCA326');
    expect(pathElement.getAttribute('d')).toBeTruthy();
  });

  it('should render the left cheek path', () => {
    const pathDebugElement = fixture.debugElement.query(
      By.css('svg path.gl-left-cheek'),
    );
    const pathElement = pathDebugElement.nativeElement as SVGPathElement;

    expect(pathElement).toBeTruthy();
    expect(pathElement.getAttribute('fill')).toBe('#FC6D26');
    expect(pathElement.getAttribute('d')).toBeTruthy();
  });

  it('should render four path elements', () => {
    const pathDebugElements = fixture.debugElement.queryAll(By.css('svg path'));

    expect(pathDebugElements.length).toBe(4);
  });
});
