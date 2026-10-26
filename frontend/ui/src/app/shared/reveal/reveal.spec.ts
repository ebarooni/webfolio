import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Reveal } from './reveal';

@Component({
  imports: [Reveal],
  template: `<p appReveal revealDelay="80ms">Visible copy</p>`,
})
class RevealHost {}

function installMatchMedia(matchesQuery: (query: string) => boolean): void {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (query: string) => {
      return {
        matches: matchesQuery(query),
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    },
  });
}

describe('Reveal', () => {
  let fixture: ComponentFixture<RevealHost> | undefined;

  const originalObserver = window.IntersectionObserver;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevealHost],
    }).compileComponents();
  });

  afterEach(() => {
    fixture?.destroy();
    window.IntersectionObserver = originalObserver;
    Reflect.deleteProperty(window, 'matchMedia');
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('leaves copy visible when motion is reduced', () => {
    installMatchMedia((query: string) => {
      return query.includes('prefers-reduced-motion');
    });

    fixture = TestBed.createComponent(RevealHost);
    fixture.detectChanges();

    const paragraph = fixture.debugElement.query(By.css('p'));
    const element = paragraph.nativeElement as HTMLParagraphElement;

    expect(element.textContent).toContain('Visible copy');
    expect(element.classList.contains('bookmark-status-reveal-pending')).toBe(
      false,
    );
  });

  it('reveals once and then stops observing', () => {
    installMatchMedia(() => false);

    let callback: IntersectionObserverCallback = () => undefined;
    const observe = vi.fn();
    const unobserve = vi.fn();

    class FakeObserver {
      readonly root = null;
      readonly rootMargin = '';
      readonly thresholds = [0.12];

      constructor(next: IntersectionObserverCallback) {
        callback = next;
      }

      observe = observe;
      unobserve = unobserve;
      disconnect = vi.fn();
      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
    }

    window.IntersectionObserver = FakeObserver;

    fixture = TestBed.createComponent(RevealHost);
    fixture.detectChanges();

    const paragraph = fixture.debugElement.query(By.css('p'));
    const element = paragraph.nativeElement as HTMLParagraphElement;

    expect(element.classList.contains('bookmark-status-reveal-pending')).toBe(
      true,
    );
    expect(observe).toHaveBeenCalledOnce();

    callback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );

    expect(element.classList.contains('bookmark-status-revealed')).toBe(true);
    expect(unobserve).toHaveBeenCalledOnce();
  });

  it('reveals after a timeout when the element never intersects', () => {
    installMatchMedia(() => false);
    vi.useFakeTimers();

    class FakeObserver {
      readonly root = null;
      readonly rootMargin = '';
      readonly thresholds = [0.12];

      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
    }

    window.IntersectionObserver = FakeObserver;

    fixture = TestBed.createComponent(RevealHost);
    fixture.detectChanges();

    const paragraph = fixture.debugElement.query(By.css('p'));
    const element = paragraph.nativeElement as HTMLParagraphElement;

    expect(element.classList.contains('bookmark-status-revealed')).toBe(false);

    vi.advanceTimersByTime(1500);

    expect(element.classList.contains('bookmark-status-revealed')).toBe(true);
  });
});
