import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ViewTransitionInfo } from '@angular/router';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { skipViewTransitionForReducedMotion } from './reduced-motion-view-transition';

describe('skipViewTransitionForReducedMotion', () => {
  const skipTransition = vi.fn();

  function runWithReducedMotion(prefersReducedMotion: boolean): void {
    const view = TestBed.inject(DOCUMENT).defaultView as Window;

    view.matchMedia = vi.fn(
      () => ({ matches: prefersReducedMotion }) as MediaQueryList,
    );

    TestBed.runInInjectionContext(() => {
      skipViewTransitionForReducedMotion({
        transition: { skipTransition },
      } as unknown as ViewTransitionInfo);
    });
  }

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('skips the transition when the visitor prefers reduced motion', () => {
    runWithReducedMotion(true);

    expect(skipTransition).toHaveBeenCalledOnce();
  });

  it('keeps the transition when the visitor has no motion preference', () => {
    runWithReducedMotion(false);

    expect(skipTransition).not.toHaveBeenCalled();
  });
});
