import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, ViewTransitionInfo } from '@angular/router';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { skipUnwantedViewTransition } from './view-transition-filter';

type FakeSnapshot = Pick<ActivatedRouteSnapshot, 'url' | 'firstChild'>;

function routeTo(...paths: string[]): ActivatedRouteSnapshot {
  const leaf = paths.reduceRight<FakeSnapshot | null>(
    (child, path) => ({
      url: [{ path }] as ActivatedRouteSnapshot['url'],
      firstChild: child as ActivatedRouteSnapshot | null,
    }),
    null,
  );

  return { url: [], firstChild: leaf } as unknown as ActivatedRouteSnapshot;
}

describe('skipUnwantedViewTransition', () => {
  const skipTransition = vi.fn();

  function run(
    from: ActivatedRouteSnapshot,
    to: ActivatedRouteSnapshot,
    prefersReducedMotion = false,
  ): void {
    const view = TestBed.inject(DOCUMENT).defaultView as Window;

    view.matchMedia = vi.fn(
      () => ({ matches: prefersReducedMotion }) as MediaQueryList,
    );

    TestBed.runInInjectionContext(() => {
      skipUnwantedViewTransition({
        transition: { skipTransition },
        from,
        to,
      } as unknown as ViewTransitionInfo);
    });
  }

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('keeps the transition for a change to another page', () => {
    run(routeTo('blog'), routeTo('blog', 'from-astro-to-angular'));

    expect(skipTransition).not.toHaveBeenCalled();
  });

  it('skips the transition when only the section of the page changes', () => {
    run(routeTo('blog', 'post'), routeTo('blog', 'post'));

    expect(skipTransition).toHaveBeenCalledOnce();
  });

  it('skips the transition when the visitor prefers reduced motion', () => {
    run(routeTo('blog'), routeTo('contact'), true);

    expect(skipTransition).toHaveBeenCalledOnce();
  });
});
