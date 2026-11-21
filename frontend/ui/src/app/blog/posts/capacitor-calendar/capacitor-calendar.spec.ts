import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';

import { CapacitorCalendarPost } from './capacitor-calendar';

describe('CapacitorCalendarPost', () => {
  let fixture: ComponentFixture<CapacitorCalendarPost>;

  function text(): string {
    return (fixture.nativeElement as HTMLElement).textContent;
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacitorCalendarPost);
    fixture.detectChanges();
  });

  it('leaves the article title to the post page', () => {
    expect(fixture.debugElement.query(By.css('h1'))).toBeNull();
  });

  it('shows the install commands and the quick start code', () => {
    expect(text()).toContain('npm install @ebarooni/capacitor-calendar');
    expect(text()).toContain('npx cap sync');
    expect(text()).toContain('CapacitorCalendar.requestFullCalendarAccess()');
    expect(text()).toContain('CapacitorCalendar.createEvent({');
  });

  it('links the plugin page, the docs, npm and GitHub', () => {
    const links = fixture.debugElement
      .queryAll(By.css('a'))
      .map((link) =>
        (link.nativeElement as HTMLAnchorElement).getAttribute('href'),
      );

    expect(links).toEqual(
      expect.arrayContaining([
        '/plugins/capacitor-calendar',
        'https://ebarooni.github.io/capacitor-calendar/',
        'https://www.npmjs.com/package/@ebarooni/capacitor-calendar',
        'https://github.com/ebarooni/capacitor-calendar',
      ]),
    );
  });

  // The plugin docs are the source for anything that changes per release.
  it('states no plugin version', () => {
    expect(text()).not.toMatch(/\bv?\d+\.\d+\.\d+\b/);
  });
});
