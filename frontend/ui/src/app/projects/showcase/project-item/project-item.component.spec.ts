import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';
import { ProjectItemComponent, type ProjectItem } from './project-item.component';

describe('ProjectItemComponent', () => {
  it('renders title, description, features and link when href is provided', async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectItemComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(ProjectItemComponent);

    const project: ProjectItem = {
      title: 'Webfolio',
      description: 'A personal portfolio website.',
      href: 'https://example.com',
      features: ['Angular', 'TailwindCSS', 'daisyUI'],
    };

    fixture.componentRef.setInput('project', project);
    fixture.detectChanges();

    const titleEl = fixture.debugElement.query(By.css('h3'));
    expect(titleEl.nativeElement.textContent).toContain('Webfolio');

    const badges = fixture.debugElement.queryAll(By.css('.badge'));
    expect(badges.map((b) => b.nativeElement.textContent.trim())).toEqual(project.features);

    const link = fixture.debugElement.query(By.css('a.btn'));
    expect(link).toBeTruthy();
    expect(link.attributes['href']).toBe(project.href);
    expect(link.attributes['rel']).toContain('noopener');
  });

  it('does not render link button when href is missing', async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectItemComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(ProjectItemComponent);

    fixture.componentRef.setInput('project', {
      title: 'Capawesome',
      description: 'Enterprise grade solutions.',
      features: ['CapacitorJS', 'Cross-platform'],
    });

    fixture.detectChanges();

    const link = fixture.debugElement.query(By.css('a.btn'));
    expect(link).toBeNull();
  });
});
