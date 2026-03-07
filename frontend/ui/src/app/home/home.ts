import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { auditTime, startWith } from 'rxjs/operators';
import dayjs from 'dayjs';

import { About } from './about/about';
import { InfoCard } from './info-card/info-card';
import { Timeline } from './timeline/timeline';
import { ScrollIndicator } from './scroll-indicator/scroll-indicator';

type HomeHighlight = Readonly<{
  title: string;
  description: string;
}>;

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  imports: [About, InfoCard, ScrollIndicator, Timeline],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-1 flex-col',
  },
})
export class Home implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);

  readonly heroSection = viewChild<ElementRef<HTMLDivElement>>('heroSection');

  readonly yearsOfExperience = dayjs().diff(dayjs('2021-01-01'), 'year');

  readonly highlights: readonly HomeHighlight[] = [
    {
      title: `${this.yearsOfExperience}+ Years Experience`,
      description:
        'Developing scalable web applications, UI and UX focused solutions, and cloud based architectures.',
    },
    {
      title: 'Angular, Ionic and Enterprise Solutions',
      description:
        'Building modular, high performance frontends with Angular, Ionic, and Capacitor.',
    },
    {
      title: 'Hybrid Apps and Custom Plugin Development',
      description:
        'Building cross platform mobile and web applications with deep experience in custom native plugin development.',
    },
  ];

  private readonly viewportHeight = signal(window.innerHeight);
  private readonly isAtPageTop = signal(window.scrollY < 1);
  private readonly heroSectionHeight = signal(0);

  readonly showScrollIndicator = computed(() => {
    console.log(
      this.isAtPageTop(),
      this.heroSectionHeight(),
      this.viewportHeight(),
    );
    return (
      this.isAtPageTop() && this.heroSectionHeight() <= this.viewportHeight()
    );
  });

  ngAfterViewInit(): void {
    this.observeViewportHeight();
    this.observeScrollPosition();
    this.observeHeroSectionHeight();
  }

  private observeViewportHeight(): void {
    fromEvent(window, 'resize')
      .pipe(
        auditTime(100),
        startWith(null),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.viewportHeight.set(window.innerHeight);
      });
  }

  private observeScrollPosition(): void {
    fromEvent(window, 'scroll')
      .pipe(auditTime(50), startWith(null), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.isAtPageTop.set(window.scrollY < 1);
      });
  }

  private observeHeroSectionHeight(): void {
    const heroSection = this.heroSection()?.nativeElement;

    if (!heroSection) {
      return;
    }

    const updateHeroSectionHeight = (): void => {
      this.heroSectionHeight.set(heroSection.getBoundingClientRect().height);
    };

    updateHeroSectionHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeroSectionHeight();
    });

    resizeObserver.observe(heroSection);

    this.destroyRef.onDestroy(() => {
      resizeObserver.disconnect();
    });
  }
}
