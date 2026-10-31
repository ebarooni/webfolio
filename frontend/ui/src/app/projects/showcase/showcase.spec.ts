import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest';
import { Showcase } from './showcase';
import type { ProjectDescription } from './project-item/project-item';

@Component({
  selector: 'app-project-item',
  standalone: true,
  template: '',
})
class MockProjectItem {
  readonly project = input.required<ProjectDescription>();
}

describe('Showcase', () => {
  let fixture: ComponentFixture<Showcase>;
  let component: Showcase;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Showcase, MockProjectItem],
      providers: [provideRouter([])],
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

  it('links Bookmark Status to the landing route', () => {
    const bookmark = component.projects.find((item) => {
      return item.title === 'Bookmark Status';
    });

    expect(bookmark?.internalPath).toBe('/apps/safari-bookmark-status');
    expect(bookmark?.description.toLowerCase()).not.toContain('icloud');
  });
});
