import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest';
import { ProjectItem, type ProjectDescription } from './project-item';

@Component({
  selector: 'app-open',
  standalone: true,
  template: '',
})
class MockOpen {}

describe('ProjectItem', () => {
  let fixture: ComponentFixture<ProjectItem>;
  let component: ProjectItem;

  const project: ProjectDescription = {
    title: 'Test Project',
    description: 'Description',
    href: 'https://example.com',
    features: ['Angular', 'TypeScript'],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectItem, MockOpen],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('project', project);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('computes hasLink correctly when href exists', () => {
    expect(component.hasLink()).toBe(true);
  });

  it('computes ariaLabel using default format', () => {
    expect(component.ariaLabel()).toBe('Open Test Project');
  });

  it('renders project title', () => {
    const titleDebug = fixture.debugElement.query(By.css('h3'));
    const titleEl = titleDebug.nativeElement as HTMLHeadingElement;
    expect(titleEl.textContent?.trim()).toBe(project.title);
  });

  it('renders project description', () => {
    const descDebug = fixture.debugElement.query(By.css('p'));
    const descEl = descDebug.nativeElement as HTMLParagraphElement;
    expect(descEl.textContent?.trim()).toBe(project.description);
  });

  it('renders feature badges', () => {
    const badges = fixture.debugElement.queryAll(By.css('.badge'));
    expect(badges.length).toBe(project.features.length);
  });

  it('renders link when href exists', () => {
    const link = fixture.debugElement.query(By.css('a'));
    expect(link).not.toBeNull();
  });

  it('uses custom aria label when provided', () => {
    const custom: ProjectDescription = {
      ...project,
      linkAriaLabel: 'Custom label',
    };

    fixture.componentRef.setInput('project', custom);
    fixture.detectChanges();

    expect(component.ariaLabel()).toBe('Custom label');
  });
});
