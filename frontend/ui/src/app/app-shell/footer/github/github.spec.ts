import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { Github } from './github';

describe('Github', () => {
  let component: Github;
  let fixture: ComponentFixture<Github>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Github],
    }).compileComponents();

    fixture = TestBed.createComponent(Github);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the svg and octocat path', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const host: HTMLElement = fixture.nativeElement;

    const svg = host.querySelector('svg.gh-icon');
    expect(svg).toBeTruthy();

    const octocat = host.querySelector('path.gh-octocat');
    expect(octocat).toBeTruthy();
  });
});
