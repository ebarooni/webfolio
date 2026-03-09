import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { themesArray, type Theme } from '../../config/themes-array';
import { DataTheme } from './data-theme';

@Component({
  standalone: true,
  imports: [DataTheme],
  template: `<div [appDataTheme]="theme()"></div>`,
})
class TestHostComponent {
  readonly theme = signal<Theme>(themesArray[0]);
}

describe('DataTheme', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create the host component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the data-theme attribute from the input', () => {
    const elementDebug = fixture.debugElement.query(By.css('div'));
    const element = elementDebug.nativeElement as HTMLDivElement;

    expect(element.getAttribute('data-theme')).toBe(themesArray[0]);
  });

  it('should update the data-theme attribute when the input changes', () => {
    component.theme.set(themesArray[1]);
    fixture.detectChanges();

    const elementDebug = fixture.debugElement.query(By.css('div'));
    const element = elementDebug.nativeElement as HTMLDivElement;

    expect(element.getAttribute('data-theme')).toBe(themesArray[1]);
  });
});
