import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ScrollIndicator } from './scroll-indicator';

describe('ScrollIndicator', () => {
  let fixture: ComponentFixture<ScrollIndicator>;
  let component: ScrollIndicator;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollIndicator],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollIndicator);
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
    expect(svgElement.getAttribute('viewBox')).toBe('0 0 24 24');
  });

  it('renders the arrow path', () => {
    const pathDebugElement = fixture.debugElement.query(By.css('path'));
    const pathElement = pathDebugElement.nativeElement as SVGPathElement;

    expect(pathElement).toBeTruthy();
    expect(pathElement.getAttribute('fill-rule')).toBe('evenodd');
    expect(pathElement.getAttribute('clip-rule')).toBe('evenodd');
  });
});
