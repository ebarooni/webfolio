import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { Home } from './home';
import { About } from './about/about';
import { InfoCard } from './info-card/info-card';
import { Timeline } from './timeline/timeline';
import { ScrollIndicator } from './scroll-indicator/scroll-indicator';

class ResizeObserverMock {
  observe(): void {
    void 0;
  }
  disconnect(): void {
    void 0;
  }
}

describe('Home', () => {
  let fixture: ComponentFixture<Home>;
  let component: Home;

  beforeAll(() => {
    (
      globalThis as typeof globalThis & {
        ResizeObserver: typeof ResizeObserver;
      }
    ).ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home, About, InfoCard, Timeline, ScrollIndicator],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('renders the about component', () => {
    const about = fixture.debugElement.query(By.directive(About));
    expect(about).not.toBeNull();
  });

  it('renders info cards for highlights', () => {
    const cards = fixture.debugElement.queryAll(By.directive(InfoCard));
    expect(cards.length).toBe(component.highlights.length);
  });

  it('renders the timeline component', () => {
    const timeline = fixture.debugElement.query(By.directive(Timeline));
    expect(timeline).not.toBeNull();
  });

  it('computes years of experience', () => {
    expect(component.yearsOfExperience).toBeGreaterThanOrEqual(0);
  });
});
