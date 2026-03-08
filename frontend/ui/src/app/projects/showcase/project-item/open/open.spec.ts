import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest';
import { Open } from './open';

describe('Open', () => {
  let fixture: ComponentFixture<Open>;
  let component: Open;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Open],
    }).compileComponents();

    fixture = TestBed.createComponent(Open);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('renders svg element', () => {
    const svgDebug = fixture.debugElement.query(By.css('svg'));
    const svgEl = svgDebug.nativeElement as SVGSVGElement;

    expect(svgEl).toBeTruthy();
    expect(svgEl.getAttribute('xmlns')).toBe('http://www.w3.org/2000/svg');
  });

  it('renders path element', () => {
    const pathDebug = fixture.debugElement.query(By.css('path'));
    const pathEl = pathDebug.nativeElement as SVGPathElement;

    expect(pathEl).toBeTruthy();
    expect(pathEl.getAttribute('stroke-linecap')).toBe('round');
    expect(pathEl.getAttribute('stroke-linejoin')).toBe('round');
  });
});
