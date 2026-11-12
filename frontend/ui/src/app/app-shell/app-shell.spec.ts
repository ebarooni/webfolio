import { Component, input, output } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router, RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { localizationTestingModule } from '../../testing/localization-testing';
import type { Language } from '../config/languages';
import { Route } from '../config/route';
import type { Theme } from '../config/themes-array';
import { AppStore } from '../store/app/app.store';
import { AppShell } from './app-shell';
import { Footer } from './footer/footer';
import { Navbar } from './navbar/navbar';

@Component({
  selector: 'app-navbar',
  template: '',
})
class MockNavbar {
  readonly selectedTheme = input.required<Theme>();
  readonly selectedLanguage = input.required<Language>();
  readonly themeChanged = output<Theme>();
  readonly languageChanged = output<Language>();
}

@Component({
  selector: 'app-footer',
  template: '',
})
class MockFooter {
  readonly bgClass = input.required<string>();
  readonly version = input.required<string>();
  readonly developerMode = input.required<boolean>();
  readonly developerModeEnabled = output();
}

@Component({
  selector: 'app-route-test',
  template: '',
})
class RouteComponent {}

describe('AppShell', () => {
  let fixture: ComponentFixture<AppShell>;
  let component: AppShell;
  let router: Router;
  let themeSubject: BehaviorSubject<Theme>;
  let languageSubject: BehaviorSubject<Language>;
  let developerModeSubject: BehaviorSubject<boolean>;

  const appStore = {
    enableDeveloperMode: vi.fn(),
    updateLanguage: vi.fn(),
    updateTheme: vi.fn(),
  };

  async function settle(): Promise<void> {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  function footer(): MockFooter {
    return fixture.debugElement.query(By.directive(MockFooter))
      .componentInstance as MockFooter;
  }

  function navbar(): MockNavbar {
    return fixture.debugElement.query(By.directive(MockNavbar))
      .componentInstance as MockNavbar;
  }

  beforeEach(async () => {
    themeSubject = new BehaviorSubject<Theme>('light');
    languageSubject = new BehaviorSubject<Language>('en');
    developerModeSubject = new BehaviorSubject<boolean>(false);

    await TestBed.configureTestingModule({
      imports: [AppShell, localizationTestingModule()],
      providers: [
        provideRouter([
          { path: '', component: RouteComponent },
          { path: Route.BUILD_INFO, component: RouteComponent },
          {
            path: Route.BLOG,
            component: RouteComponent,
            data: { footerBgClass: 'bg-neutral', page: Route.BLOG },
          },
        ]),
        {
          provide: AppStore,
          useValue: {
            ...appStore,
            selectDeveloperMode$: developerModeSubject.asObservable(),
            selectLanguage$: languageSubject.asObservable(),
            selectTheme$: themeSubject.asObservable(),
          },
        },
      ],
    })
      .overrideComponent(AppShell, {
        remove: { imports: [Navbar, Footer, RouterOutlet] },
        add: { imports: [MockNavbar, MockFooter, RouterOutlet] },
      })
      .compileComponents();

    router = TestBed.inject(Router);
    await router.navigateByUrl('/');

    fixture = TestBed.createComponent(AppShell);
    component = fixture.componentInstance;
    await settle();
  });

  afterEach(() => {
    vi.clearAllMocks();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.removeAttribute('lang');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the document theme attribute from the current theme', () => {
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    themeSubject.next('dark');
    fixture.detectChanges();

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should set the document language from the current language', () => {
    expect(document.documentElement.getAttribute('lang')).toBe('en');

    languageSubject.next('de');
    fixture.detectChanges();

    expect(document.documentElement.getAttribute('lang')).toBe('de');
  });

  it('should forward theme and language changes to the app store', () => {
    navbar().themeChanged.emit('dark');
    navbar().languageChanged.emit('de');

    expect(appStore.updateTheme).toHaveBeenCalledExactlyOnceWith('dark');
    expect(appStore.updateLanguage).toHaveBeenCalledExactlyOnceWith('de');
  });

  it('should pass the theme and the language to the navbar', () => {
    expect(navbar().selectedTheme()).toBe('light');
    expect(navbar().selectedLanguage()).toBe('en');
  });

  it('should pass the version and the developer mode to the footer', async () => {
    developerModeSubject.next(true);
    await settle();

    expect(footer().version()).toBe(component.version);
    expect(footer().developerMode()).toBe(true);
  });

  it('should store the developer mode and open the build details', async () => {
    footer().developerModeEnabled.emit();
    await settle();

    expect(appStore.enableDeveloperMode).toHaveBeenCalledOnce();
    expect(router.url).toBe(`/${Route.BUILD_INFO}`);
  });

  it('should use the default ui config when the route has no data', () => {
    expect(component.uiConfig()).toEqual({
      footerBgClass: 'bg-base-200',
      page: Route.HOME,
    });
    expect(footer().bgClass()).toBe('bg-base-200');
  });

  it('should read the ui config from the route data after navigation', async () => {
    await router.navigateByUrl(`/${Route.BLOG}`);
    await settle();

    expect(component.uiConfig()).toEqual({
      footerBgClass: 'bg-neutral',
      page: Route.BLOG,
    });
    expect(footer().bgClass()).toBe('bg-neutral');
  });

  it('should render the router outlet inside the main element', () => {
    const outlet = fixture.debugElement.query(By.css('main router-outlet'));

    expect(outlet).toBeTruthy();
  });
});
