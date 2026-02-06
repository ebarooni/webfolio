import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

import { AppShell } from './app-shell';
import { AppStore } from '../store/app/app.store';
import { Theme } from '../config/constants/themes-array';
import { ShellVariant } from '../config/constants/shell-variant';
import { VERSION } from '../../environments/build-info';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: '',
})
class NavbarStubComponent {
  @Input() selectedTheme!: Theme;
  @Input() version!: string;
  @Output() themeChanged = new EventEmitter<Theme>();
}

@Component({
  selector: 'app-compact-navbar',
  standalone: true,
  template: '',
})
class CompactNavbarStubComponent {
  @Input() selectedTheme!: Theme;
  @Input() version!: string;
  @Output() themeChanged = new EventEmitter<Theme>();
}

@Component({
  selector: 'app-footer',
  standalone: true,
  template: '',
})
class FooterStubComponent {}

@Component({
  standalone: true,
  template: '<div>dummy</div>',
})
class DummyRouteComponent {}

describe('AppShell', () => {
  let router: Router;

  const setup = async (opts?: { initialTheme?: Theme }) => {
    const theme$ = new BehaviorSubject<Theme>(opts?.initialTheme ?? ('light' as Theme));

    const appStoreMock: Pick<AppStore, 'selectTheme$' | 'updateTheme'> = {
      selectTheme$: theme$.asObservable() as any,
      updateTheme: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [AppShell],
      providers: [
        { provide: AppStore, useValue: appStoreMock },
        provideRouter([
          { path: '', component: DummyRouteComponent },
          { path: 'plain', component: DummyRouteComponent, data: { shellVariant: 'plain' as ShellVariant } },
        ]),
      ],
    })
      .overrideComponent(AppShell, {
        set: {
          imports: [
            NavbarStubComponent,
            CompactNavbarStubComponent,
            FooterStubComponent,
            RouterOutlet,
          ],
        },
      })
      .compileComponents();

    router = TestBed.inject(Router);

    const fixture = TestBed.createComponent(AppShell);
    fixture.detectChanges();

    return { fixture, appStoreMock, theme$ };
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', async () => {
    const { fixture } = await setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  describe('version', () => {
    it('should expose the version string prefixed with "v"', async () => {
      const { fixture } = await setup();
      expect(fixture.componentInstance.version).toBe(`v${VERSION}`);
    });
  });

  describe('theme effect', () => {
    it('should set data-theme on <html> to the initial theme', async () => {
      await setup({ initialTheme: 'light' as Theme });
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    it('should update data-theme on <html> when theme changes', async () => {
      const { fixture, theme$ } = await setup({ initialTheme: 'light' as Theme });

      theme$.next('dark' as Theme);
      fixture.detectChanges();

      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
  });

  describe('themeChanged', () => {
    it('should call AppStore.updateTheme with the given theme', async () => {
      const { fixture, appStoreMock } = await setup();

      fixture.componentInstance.themeChanged('dark' as Theme);

      expect(appStoreMock.updateTheme).toHaveBeenCalledTimes(1);
      expect(appStoreMock.updateTheme).toHaveBeenCalledWith('dark');
    });

    it('should be wired from both nav components outputs', async () => {
      const { fixture, appStoreMock } = await setup();

      const compact = fixture.debugElement.query(By.directive(CompactNavbarStubComponent))
        .componentInstance as CompactNavbarStubComponent;

      const navbar = fixture.debugElement.query(By.directive(NavbarStubComponent))
        .componentInstance as NavbarStubComponent;

      compact.themeChanged.emit('dark' as Theme);
      navbar.themeChanged.emit('light' as Theme);

      expect(appStoreMock.updateTheme).toHaveBeenCalledTimes(2);
      expect(appStoreMock.updateTheme).toHaveBeenNthCalledWith(1, 'dark');
      expect(appStoreMock.updateTheme).toHaveBeenNthCalledWith(2, 'light');
    });
  });

  describe('template bindings', () => {
    it('should pass selectedTheme and version to both navbar components', async () => {
      const { fixture, theme$ } = await setup({ initialTheme: 'light' as Theme });

      const compact = fixture.debugElement.query(By.directive(CompactNavbarStubComponent))
        .componentInstance as CompactNavbarStubComponent;

      const navbar = fixture.debugElement.query(By.directive(NavbarStubComponent))
        .componentInstance as NavbarStubComponent;

      expect(compact.selectedTheme).toBe('light');
      expect(navbar.selectedTheme).toBe('light');
      expect(compact.version).toBe(`v${VERSION}`);
      expect(navbar.version).toBe(`v${VERSION}`);

      theme$.next('dark' as Theme);
      fixture.detectChanges();

      expect(compact.selectedTheme).toBe('dark');
      expect(navbar.selectedTheme).toBe('dark');
    });

    it('should render a RouterOutlet and footer', async () => {
      const { fixture } = await setup();

      expect(fixture.debugElement.query(By.directive(RouterOutlet))).toBeTruthy();
      expect(fixture.debugElement.query(By.directive(FooterStubComponent))).toBeTruthy();
    });
  });

  describe('variant and shellClass', () => {
    it('should have initial variant "default"', async () => {
      const { fixture } = await setup();
      expect(fixture.componentInstance.variant()).toBe('default');
    });

    it('should update variant based on leaf route data after NavigationEnd', fakeAsync(async () => {
      const { fixture } = await setup();

      router.navigateByUrl('/plain');
      tick();
      fixture.detectChanges();

      expect(fixture.componentInstance.variant()).toBe('plain');
    }));

    it('should compute the expected shellClass for default variant', async () => {
      const { fixture } = await setup();
      expect(fixture.componentInstance.shellClass()).toBe(
        'min-h-screen w-full flex flex-col bg-base-100',
      );
    });

    it('should compute the expected shellClass for plain variant', fakeAsync(async () => {
      const { fixture } = await setup();

      router.navigateByUrl('/plain');
      tick();
      fixture.detectChanges();

      expect(fixture.componentInstance.shellClass()).toBe(
        'min-h-screen w-full flex flex-col bg-base-100',
      );
    }));
  });
});
