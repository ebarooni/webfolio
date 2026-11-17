import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { ViewTransitionInfo } from '@angular/router';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Skips the page transition when the visitor asks for less motion.
 * The navigation itself continues. Only the animation does not run.
 */
export function skipViewTransitionForReducedMotion({
  transition,
}: ViewTransitionInfo): void {
  const view = inject(DOCUMENT).defaultView;

  if (view?.matchMedia(REDUCED_MOTION_QUERY).matches) {
    transition.skipTransition();
  }
}
