import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest';
import { Projects } from './projects';

describe('Projects', () => {
  let fixture: ComponentFixture<Projects>;
  let component: Projects;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(Projects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('renders hero component', () => {
    const hero = fixture.debugElement.query(By.css('app-hero'));
    expect(hero).not.toBeNull();
  });

  it('renders showcase component', () => {
    const showcase = fixture.debugElement.query(By.css('app-showcase'));
    expect(showcase).not.toBeNull();
  });
});
