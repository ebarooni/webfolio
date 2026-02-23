import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { auditTime, startWith } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import dayjs from 'dayjs';

import { AboutComponent } from './about/about.component';
import { InfoCardComponent } from './info-card/info-card.component';
import { ScrollIndicatorComponent } from '../svg-components/scroll-indicator/scroll-indicator.component';
import { TimelineComponent } from './timeline/timeline.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  imports: [
    AboutComponent,
    InfoCardComponent,
    ScrollIndicatorComponent,
    TimelineComponent,
  ],
})
export class HomeComponent implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('aboutSection', { read: ElementRef })
  private readonly aboutSectionEl?: ElementRef<HTMLElement>;

  readonly yearsOfExperience = dayjs().diff(dayjs('2021-01-01'), 'year');

  private readonly viewportH = signal<number>(window.innerHeight);
  private readonly hasNotScrolled = signal<boolean>(window.scrollY < 1);

  private readonly aboutH = signal<number>(0);

  readonly showScrollIndicator = computed(
    () => this.hasNotScrolled() && this.aboutH() <= this.viewportH(),
  );

  ngAfterViewInit(): void {
    fromEvent(window, 'resize')
      .pipe(
        auditTime(100),
        startWith(null),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.viewportH.set(window.innerHeight));

    fromEvent(document, 'scroll')
      .pipe(auditTime(50), startWith(null), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.hasNotScrolled.set(window.scrollY < 1));

    const el = this.aboutSectionEl?.nativeElement;
    if (!el) return;

    const setAboutHeight = () =>
      this.aboutH.set(el.getBoundingClientRect().height);
    setAboutHeight();

    const ro = new ResizeObserver(() => setAboutHeight());
    ro.observe(el);

    this.destroyRef.onDestroy(() => ro.disconnect());
  }
}
