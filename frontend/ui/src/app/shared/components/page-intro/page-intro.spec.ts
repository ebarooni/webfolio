import { Component } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';

import { PageIntro } from './page-intro';

@Component({
  imports: [PageIntro],
  template: `
    <app-page-intro
      eyebrow="Contact"
      title="Say hello."
      lead="A short introduction."
      titleId="contact-title"
      size="compact"
    >
      <p id="extra">More content</p>
    </app-page-intro>
  `,
})
class PageIntroHost {}

describe('PageIntro', () => {
  let fixture: ComponentFixture<PageIntro>;

  function text(selector: string): string {
    return (
      fixture.debugElement.query(By.css(selector)).nativeElement as HTMLElement
    ).textContent.trim();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageIntro, PageIntroHost],
    }).compileComponents();

    fixture = TestBed.createComponent(PageIntro);
    fixture.componentRef.setInput('eyebrow', 'Work · 8 projects');
    fixture.componentRef.setInput('title', 'Things I have built.');
    fixture.detectChanges();
  });

  it('shows the eyebrow and a large title', () => {
    expect(text('p')).toBe('Work · 8 projects');
    expect(text('h1')).toBe('Things I have built.');
    expect(
      (fixture.debugElement.query(By.css('h1')).nativeElement as HTMLElement)
        .classList,
    ).toContain('text-page-title');
  });

  it('does not render a lead paragraph without a lead', () => {
    expect(fixture.debugElement.queryAll(By.css('p'))).toHaveLength(1);
  });

  it('shows a compact title, its id, the lead and the projected content', () => {
    const hostFixture = TestBed.createComponent(PageIntroHost);
    hostFixture.detectChanges();

    const root = hostFixture.nativeElement as HTMLElement;
    const title = root.querySelector('h1');

    expect(title?.id).toBe('contact-title');
    expect(title?.classList).toContain('text-compact-title');
    expect(root.querySelector('h1 + p')?.textContent.trim()).toBe(
      'A short introduction.',
    );
    expect(root.querySelector('#extra')?.textContent).toBe('More content');
  });
});
