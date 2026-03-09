import { Component, input, output } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter, Router, RouterOutlet } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { AppShell } from './app-shell';
import { Route } from '../config/route';
import type { Theme } from '../config/themes-array';
import { AppStore } from '../store/app/app.store';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { CompactNavbar } from './compact-navbar/compact-navbar';

@Component({
  selector: 'app-navbar',
  template: '',
})
class MockNavbar {
  readonly selectedTheme = input.required<Theme>();
  readonly version = input.required<string>();
  readonly themeChanged = output<Theme>();
}

@Component({
  selector: 'app-compact-navbar',
  template: '',
})
class MockCompactNavbar {
  readonly selectedTheme = input.required<Theme>();
  readonly version = input.required<string>();
  readonly themeChanged = output<Theme>();
}

@Component({
  selector: 'app-footer',
  template: '',
})
class MockFooter {
  readonly bgClass = input.required<string>();
}

@Component({
  selector: 'app-default-route-test',
  template: '',
})
class DefaultRouteComponent {}

@Component({
  selector: 'app-blog-route-test',
  template: '',
})
class BlogRouteComponent {}

describe('AppShell', () => {
  let fixture: ComponentFixture<AppShell>;
  let component: AppShell;
  let router: Router;
  let themeSubject: BehaviorSubject<Theme>;
  let updateTheme: ReturnType<
    typeof vi.fn<(observableOrValue: Theme | Observable<Theme>) => Subscription>
  >;

  beforeAll(() => {
    document.documentElement.removeAttribute('data-theme');
  });

  beforeEach(async () => {
    themeSubject = new BehaviorSubject<Theme>('light');
    updateTheme = vi.fn();

    await TestBed.configureTestingModule({
      imports: [AppShell],
      providers: [
        provideRouter([
          {
            path: '',
            component: DefaultRouteComponent,
          },
          {
            path: 'blog',
            component: BlogRouteComponent,
            data: {
              footerBgClass: 'bg-neutral',
              page: Route.BLOG,
            },
          },
        ]),
        {
          provide: AppStore,
          useValue: {
            selectTheme$: themeSubject.asObservable(),
            updateTheme,
          } satisfies Pick<AppStore, 'selectTheme$' | 'updateTheme'>,
        },
      ],
    })
      .overrideComponent(AppShell, {
        remove: {
          imports: [Navbar, CompactNavbar, Footer, RouterOutlet],
        },
        add: {
          imports: [MockNavbar, MockCompactNavbar, MockFooter, RouterOutlet],
        },
      })
      .compileComponents();

    router = TestBed.inject(Router);
    await router.navigateByUrl('/');

    fixture = TestBed.createComponent(AppShell);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  afterEach(() => {
    themeSubject.complete();
    vi.clearAllMocks();
    document.documentElement.removeAttribute('data-theme');
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the document theme attribute from the current theme signal', () => {
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    themeSubject.next('dark');
    fixture.detectChanges();

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should forward theme changes to the app store', () => {
    component.themeChanged('dark');

    expect(updateTheme).toHaveBeenCalledOnce();
    expect(updateTheme).toHaveBeenCalledWith('dark');
  });

  it('should pass the current theme and version to both navbar variants', () => {
    const navbarDebugElement = fixture.debugElement.query(
      By.directive(MockNavbar),
    );
    const compactNavbarDebugElement = fixture.debugElement.query(
      By.directive(MockCompactNavbar),
    );

    const navbarInstance = navbarDebugElement.componentInstance as MockNavbar;
    const compactNavbarInstance =
      compactNavbarDebugElement.componentInstance as MockCompactNavbar;

    expect(navbarInstance.selectedTheme()).toBe('light');
    expect(compactNavbarInstance.selectedTheme()).toBe('light');
    expect(navbarInstance.version()).toBe(component.version);
    expect(compactNavbarInstance.version()).toBe(component.version);
  });

  it('should use the default ui config when the active route has no route data', () => {
    const footerDebugElement = fixture.debugElement.query(
      By.directive(MockFooter),
    );
    const footerInstance = footerDebugElement.componentInstance as MockFooter;

    expect(component.uiConfig()).toEqual({
      footerBgClass: 'bg-base-200',
      page: Route.HOME,
    });
    expect(footerInstance.bgClass()).toBe('bg-base-200');
  });

  it('should update the ui config from the active route data after navigation', async () => {
    await router.navigateByUrl('/blog');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const footerDebugElement = fixture.debugElement.query(
      By.directive(MockFooter),
    );
    const footerInstance = footerDebugElement.componentInstance as MockFooter;

    expect(component.uiConfig()).toEqual({
      footerBgClass: 'bg-neutral',
      page: Route.BLOG,
    });
    expect(footerInstance.bgClass()).toBe('bg-neutral');
  });

  it('should render the router outlet inside the main element', () => {
    const mainDebugElement = fixture.debugElement.query(By.css('main'));
    const routerOutletDebugElement = fixture.debugElement.query(
      By.directive(RouterOutlet),
    );

    const mainElement = mainDebugElement.nativeElement as HTMLElement;

    expect(mainElement).toBeTruthy();
    expect(routerOutletDebugElement).toBeTruthy();
  });
});
