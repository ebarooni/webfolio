import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { BookmarkStatusShot } from './shot';

describe('BookmarkStatusShot', () => {
  let fixture: ComponentFixture<BookmarkStatusShot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkStatusShot],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkStatusShot);
    fixture.componentRef.setInput('name', 'hero-tree');
    fixture.componentRef.setInput('theme', 'light');
    fixture.componentRef.setInput('alt', 'Tree');
    fixture.componentRef.setInput('width', 1280);
    fixture.componentRef.setInput('height', 918);
    fixture.componentRef.setInput('eager', true);
    fixture.componentRef.setInput('priority', true);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('points at the theme file and a 2x source', () => {
    const image = fixture.debugElement.query(By.css('img'));
    const img = image.nativeElement as HTMLImageElement;

    expect(img.getAttribute('src')).toContain('/shots/hero-tree-light.webp');
    expect(img.getAttribute('srcset')).toContain('hero-tree-light@2x.webp 2x');
    expect(img.getAttribute('fetchpriority')).toBe('high');
    expect(img.getAttribute('alt')).toBe('Tree');
  });

  it('swaps the file when the theme input changes', () => {
    fixture.componentRef.setInput('theme', 'dark');
    fixture.detectChanges();

    const image = fixture.debugElement.query(By.css('img'));
    const img = image.nativeElement as HTMLImageElement;

    expect(img.getAttribute('src')).toContain('hero-tree-dark.webp');
  });
});
