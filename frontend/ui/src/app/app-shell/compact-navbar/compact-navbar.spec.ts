import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CompactNavbar } from './compact-navbar';
import type { Theme } from '../../config/constants/themes-array';
import { Route } from '../../config/constants/route';

describe('CompactNavbar', () => {
  let component: CompactNavbar;
  let fixture: ComponentFixture<CompactNavbar>;

  const setInputs = (opts?: { theme?: Theme; version?: string | undefined }) => {
    fixture.componentRef.setInput('selectedTheme', (opts?.theme ?? ('light' as Theme)) as Theme);
    fixture.componentRef.setInput('version', opts?.version);
    fixture.detectChanges();
  };

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [CompactNavbar],
      providers: [provideRouter([])],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CompactNavbar);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    setInputs();
    expect(component).toBeTruthy();
  });

  it('should render Theme button', () => {
    setInputs();
    const themeBtn = fixture.debugElement.queryAll(By.css('button'))
      .find((b) => (b.nativeElement as HTMLButtonElement).textContent?.includes('Theme'));
    expect(themeBtn).toBeTruthy();
  });

  it('should toggle menu open state when hamburger is clicked', () => {
    setInputs();

    const toggleBtn = fixture.debugElement.query(By.css('button[aria-controls="compact-nav-menu"]'));
    expect(toggleBtn).toBeTruthy();

    expect(component.isMenuOpen()).toBe(false);

    toggleBtn.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();
    expect(component.isMenuOpen()).toBe(true);

    toggleBtn.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();
    expect(component.isMenuOpen()).toBe(false);
  });

  it('should apply collapse-open class when menu is open', () => {
    setInputs();

    const root = fixture.debugElement.query(By.css('div.collapse'));
    expect(root).toBeTruthy();

    expect((root.nativeElement as HTMLElement).classList.contains('collapse-open')).toBe(false);

    component.isMenuOpen.set(true);
    fixture.detectChanges();

    expect((root.nativeElement as HTMLElement).classList.contains('collapse-open')).toBe(true);
  });

  it('should apply bg-base-300 to the title when menu is open', () => {
    setInputs();

    const title = fixture.debugElement.query(By.css('.collapse-title'));
    expect(title).toBeTruthy();

    expect((title.nativeElement as HTMLElement).classList.contains('bg-base-300')).toBe(false);

    component.isMenuOpen.set(true);
    fixture.detectChanges();

    expect((title.nativeElement as HTMLElement).classList.contains('bg-base-300')).toBe(true);
  });

  it('should render nav items (without Build when version is undefined)', () => {
    setInputs({ version: undefined });

    const links = fixture.debugElement.queryAll(By.css('#compact-nav-menu a'));
    const texts = links.map((l) => (l.nativeElement as HTMLAnchorElement).textContent?.trim());

    expect(texts).toContain('Home');
    expect(texts).toContain('Blog');
    expect(texts).toContain('Projects');
    expect(texts).toContain('Contact');

    expect(texts).not.toContain('Build');
  });

  it('should show version text for the Build item when version is provided', () => {
    setInputs({ version: '1.2.3' });

    const links = fixture.debugElement.queryAll(By.css('#compact-nav-menu a'));
    const texts = links.map((l) => (l.nativeElement as HTMLAnchorElement).textContent?.trim());

    expect(texts).toContain('1.2.3');
  });

  it('should close the menu when clicking a nav link', () => {
    setInputs({ version: undefined });

    component.isMenuOpen.set(true);
    fixture.detectChanges();

    const firstLink = fixture.debugElement.query(By.css('#compact-nav-menu a'));
    expect(firstLink).toBeTruthy();

    firstLink.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    expect(component.isMenuOpen()).toBe(false);
  });

  it('should bind routerLink values for known routes', () => {
    setInputs({ version: undefined });

    const linkDes = fixture.debugElement.queryAll(By.css('#compact-nav-menu a'));
    expect(linkDes.length).toBeGreaterThan(0);

    const homeLink = linkDes.find((de) =>
      (de.nativeElement as HTMLAnchorElement).textContent?.trim() === 'Home'
    );
    expect(homeLink).toBeTruthy();

    const routerLinkVal = homeLink!.properties['routerLink'] as unknown;
    expect(routerLinkVal).toBe(Route.HOME);
  });
});