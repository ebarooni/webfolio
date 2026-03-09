import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Checkmark } from './checkmark';

describe('Checkmark', () => {
  let fixture: ComponentFixture<Checkmark>;
  let component: Checkmark;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Checkmark],
    }).compileComponents();

    fixture = TestBed.createComponent(Checkmark);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('renders the svg element', () => {
    const svgDebugElement = fixture.debugElement.query(By.css('svg'));
    const svgElement = svgDebugElement.nativeElement as SVGElement;

    expect(svgElement).toBeTruthy();
    expect(svgElement.getAttribute('viewBox')).toBe('0 0 20 20');
  });

  it('renders the checkmark path', () => {
    const pathDebugElement = fixture.debugElement.query(By.css('path'));
    const pathElement = pathDebugElement.nativeElement as SVGPathElement;

    expect(pathElement).toBeTruthy();
    expect(pathElement.getAttribute('fill-rule')).toBe('evenodd');
    expect(pathElement.getAttribute('clip-rule')).toBe('evenodd');
  });
});
