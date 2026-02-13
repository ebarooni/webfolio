import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { Gitlab } from './gitlab';

describe('Gitlab', () => {
  let component: Gitlab;
  let fixture: ComponentFixture<Gitlab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gitlab],
    }).compileComponents();

    fixture = TestBed.createComponent(Gitlab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the svg and four paths', () => {
    const host: HTMLElement = fixture.nativeElement;

    const svg = host.querySelector('svg.gl-icon');
    expect(svg).toBeTruthy();

    expect(host.querySelector('path.gl-forehead')).toBeTruthy();
    expect(host.querySelector('path.gl-right-cheek')).toBeTruthy();
    expect(host.querySelector('path.gl-chin')).toBeTruthy();
    expect(host.querySelector('path.gl-left-cheek')).toBeTruthy();
  });
});