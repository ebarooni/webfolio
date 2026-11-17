import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ViewTransitionInfo } from '@angular/router';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function pathOf(root: ActivatedRouteSnapshot): string {
  const segments: string[] = [];
  let snapshot: ActivatedRouteSnapshot | null = root;

  while (snapshot) {
    segments.push(...snapshot.url.map((segment) => segment.path));
    snapshot = snapshot.firstChild;
  }

  return segments.join('/');
}

/**
 * Skips the page transition when the page does not change, for example
 * for a link to a section of the same post. Also skips it when the
 * visitor asks for less motion. The navigation itself always continues.
 */
export function skipUnwantedViewTransition({
  transition,
  from,
  to,
}: ViewTransitionInfo): void {
  const view = inject(DOCUMENT).defaultView;
  const prefersReducedMotion =
    view?.matchMedia(REDUCED_MOTION_QUERY).matches ?? false;

  if (prefersReducedMotion || pathOf(from) === pathOf(to)) {
    transition.skipTransition();
  }
}
