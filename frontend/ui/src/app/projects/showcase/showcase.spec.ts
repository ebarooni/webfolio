import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest';
import { Showcase } from './showcase';
import type { ProjectDescription } from './project-item/project-item';

@Component({
  selector: 'app-project-item',
  standalone: true,
  template: '',
})
class MockProjectItem {
  @Input() project!: ProjectDescription;
}

describe('Showcase', () => {
  let fixture: ComponentFixture<Showcase>;
  let component: Showcase;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Showcase, MockProjectItem],
    }).compileComponents();

    fixture = TestBed.createComponent(Showcase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('renders a project item for each project', () => {
    const items = fixture.debugElement.queryAll(By.css('app-project-item'));
    expect(items.length).toBe(component.projects.length);
  });
});
