import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { localizationTestingModule } from '../../../testing/localization-testing';
import { Route } from '../../config/route';
import { Footer } from './footer';

describe('Footer', () => {
  let fixture: ComponentFixture<Footer>;
  let component: Footer;

  function tapVersion(times: number): void {
    const button = fixture.debugElement.query(By.css('button'));

    for (let tap = 0; tap < times; tap += 1) {
      button.triggerEventHandler('click');
    }

    fixture.detectChanges();
  }

  function toastText(): string | undefined {
    const toast = fixture.debugElement.query(By.css('[role="status"]'));

    return (
      toast?.nativeElement as HTMLElement | undefined
    )?.textContent.trim();
  }

  beforeEach(async () => {
    vi.useFakeTimers();

    await TestBed.configureTestingModule({
      imports: [Footer, localizationTestingModule()],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('bgClass', 'bg-base-200');
    fixture.componentRef.setInput('version', 'v1.2.3');
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the background class', () => {
    const footer = fixture.debugElement.query(By.css('footer'))
      .nativeElement as HTMLElement;

    expect(footer.classList.contains('bg-base-200')).toBe(true);
  });

  it('should render the current year in the copyright text', () => {
    const copyright = fixture.debugElement.query(By.css('footer p'))
      .nativeElement as HTMLParagraphElement;

    expect(copyright.textContent).toContain(String(component.currentYear));
  });

  it('should render every social link as a safe external link', () => {
    const anchors = fixture.debugElement
      .queryAll(By.css('nav a'))
      .map((anchor) => anchor.nativeElement as HTMLAnchorElement);

    expect(anchors.map((anchor) => anchor.getAttribute('href'))).toEqual(
      component.links.map((link) => link.href),
    );

    for (const anchor of anchors) {
      expect(anchor.target).toBe('_blank');
      expect(anchor.rel).toContain('noopener');
    }
  });

  it('should stay silent for the first version taps', () => {
    tapVersion(3);

    expect(toastText()).toBeUndefined();
  });

  it('should count down from the fourth version tap', () => {
    tapVersion(4);

    expect(toastText()).toBe('3 more to go');
  });

  it('should hide the countdown after a short time', () => {
    tapVersion(4);
    vi.advanceTimersByTime(1500);
    fixture.detectChanges();

    expect(toastText()).toBeUndefined();
  });

  it('should enable the developer mode on the seventh version tap', () => {
    const developerModeEnabled = vi.fn();
    component.developerModeEnabled.subscribe(developerModeEnabled);

    tapVersion(7);

    expect(developerModeEnabled).toHaveBeenCalledOnce();
    expect(toastText()).toBe('Developer mode enabled');
  });

  it('should link the version to the build details in developer mode', () => {
    fixture.componentRef.setInput('developerMode', true);
    fixture.detectChanges();

    const versionLink = fixture.debugElement.query(By.css('div > a'))
      .nativeElement as HTMLAnchorElement;

    expect(versionLink.getAttribute('href')).toBe(`/${Route.BUILD_INFO}`);
    expect(versionLink.textContent).toContain('v1.2.3');
    expect(fixture.debugElement.query(By.css('button'))).toBeNull();
  });

  it('should hide the version when it is empty', () => {
    fixture.componentRef.setInput('version', '');
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('button'))).toBeNull();
  });
});
