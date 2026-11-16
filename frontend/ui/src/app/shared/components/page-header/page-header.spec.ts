import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';

import { PageHeader } from './page-header';

describe('PageHeader', () => {
  let fixture: ComponentFixture<PageHeader>;

  function text(selector: string): string {
    return (
      fixture.debugElement.query(By.css(selector)).nativeElement as HTMLElement
    ).textContent.trim();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(PageHeader);
    fixture.componentRef.setInput('eyebrow', 'Work · 8 projects');
    fixture.componentRef.setInput('title', 'Things I have built.');
    fixture.detectChanges();
  });

  it('should show the eyebrow and the title', () => {
    expect(text('p')).toBe('Work · 8 projects');
    expect(text('h1')).toBe('Things I have built.');
  });

  it('should not render a lead paragraph without a lead', () => {
    expect(fixture.debugElement.queryAll(By.css('p'))).toHaveLength(1);
  });

  it('should show the lead below the title', () => {
    fixture.componentRef.setInput('lead', 'A short introduction.');
    fixture.detectChanges();

    expect(text('h1 + p')).toBe('A short introduction.');
  });
});
