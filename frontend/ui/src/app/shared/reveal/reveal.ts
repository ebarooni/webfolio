import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
} from '@angular/core';

@Directive({
  selector: '[appReveal]',
  host: {
    '[style.--d]': 'revealDelay()',
  },
})
export class Reveal implements AfterViewInit {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  readonly revealDelay = input('0ms');

  ngAfterViewInit(): void {
    const view = this.document.defaultView;

    if (!view) {
      return;
    }

    const motionQuery = view.matchMedia?.('(prefers-reduced-motion: reduce)');
    const reducedMotion = motionQuery?.matches ?? false;

    if (reducedMotion || typeof view.IntersectionObserver !== 'function') {
      return;
    }

    const element = this.elementRef.nativeElement as HTMLElement;
    element.classList.add('bms-reveal-pending');

    let revealed = false;
    let timeoutId = 0;

    const finish = (observer: IntersectionObserver): void => {
      if (revealed) {
        return;
      }

      revealed = true;
      element.classList.add('bms-revealed');
      observer.unobserve(element);
      view.clearTimeout(timeoutId);
    };

    const observer = new view.IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          finish(observer);
        }
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.12,
      },
    );

    observer.observe(element);
    timeoutId = view.setTimeout(() => {
      finish(observer);
    }, 1500);

    this.destroyRef.onDestroy(() => {
      view.clearTimeout(timeoutId);
      observer.disconnect();
    });
  }
}
