import { Component } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';

import { ArrowLink } from './arrow-link';

@Component({
  imports: [ArrowLink],
  template: `
    <a id="forward" appArrowLink href="/blog">All posts</a>
    <a id="back" appArrowLink direction="back" href="/blog">Back</a>
  `,
})
class ArrowLinkHost {}

describe('ArrowLink', () => {
  let fixture: ComponentFixture<ArrowLinkHost>;

  function link(id: string): HTMLElement {
    return fixture.debugElement.query(By.css(`#${id}`))
      .nativeElement as HTMLElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrowLinkHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ArrowLinkHost);
    fixture.detectChanges();
  });

  it('shows the arrow after the text for a forward link', () => {
    expect(link('forward').textContent.trim()).toBe('All posts');
    expect(link('forward').lastElementChild?.tagName).toBe('APP-ARROW-ICON');
  });

  it('shows a back arrow before the text for a back link', () => {
    const arrow = link('back').firstElementChild;

    expect(arrow?.tagName).toBe('APP-ARROW-ICON');
    expect(arrow?.classList).toContain('rotate-180');
  });
});
