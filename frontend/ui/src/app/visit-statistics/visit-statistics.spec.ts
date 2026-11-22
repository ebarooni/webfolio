import { Component, PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationEnd, provideRouter, Router } from '@angular/router';
import { afterEach, describe, expect, it } from 'vitest';

import { AnalyticsConfig } from '../config/analytics';
import { ANALYTICS_CONFIG, startVisitStatistics } from './visit-statistics';

@Component({ template: '' })
class EmptyPage {}

const TEST_CONFIG: AnalyticsConfig = {
  host: window.location.hostname,
  websiteId: '00000000-0000-0000-0000-000000000000',
  scriptPath: '/insights/i.js',
};

function setUp(
  config: Partial<AnalyticsConfig> = {},
  platform = 'browser',
): Router {
  TestBed.configureTestingModule({
    providers: [
      provideRouter([
        { path: 'access-denied', component: EmptyPage },
        { path: '**', component: EmptyPage },
      ]),
      { provide: ANALYTICS_CONFIG, useValue: { ...TEST_CONFIG, ...config } },
      { provide: PLATFORM_ID, useValue: platform },
    ],
  });

  TestBed.runInInjectionContext(() => startVisitStatistics());

  return TestBed.inject(Router);
}

function trackerScript(): HTMLScriptElement | null {
  return document.querySelector<HTMLScriptElement>('script#visit-statistics');
}

describe('startVisitStatistics', () => {
  afterEach(() => {
    trackerScript()?.remove();
  });

  it('should load the tracker after the first page opened', async () => {
    const router = setUp();
    expect(trackerScript()).toBeNull();

    await router.navigateByUrl('/de/projects');

    const script = trackerScript();
    expect(script?.getAttribute('src')).toBe('/insights/i.js');
    expect(script?.dataset['websiteId']).toBe(TEST_CONFIG.websiteId);
    expect(script?.dataset['hostUrl']).toBe(`https://${TEST_CONFIG.host}`);
    expect(script?.dataset['domains']).toBe(TEST_CONFIG.host);
    expect(script?.dataset['beforeSend']).toBeUndefined();
    expect(script?.dataset['doNotTrack']).toBe('true');
    expect(script?.dataset['excludeSearch']).toBe('true');
    expect(script?.dataset['excludeHash']).toBe('true');
  });

  it('should load the tracker only once', async () => {
    const router = setUp();

    await router.navigateByUrl('/');
    await router.navigateByUrl('/nl/blog');

    expect(document.querySelectorAll('script#visit-statistics')).toHaveLength(
      1,
    );
  });

  it('should load the tracker on the access screen too', async () => {
    const router = setUp();

    await router.navigateByUrl('/access-denied');

    expect(router.url).toBe('/access-denied');
    expect(trackerScript()?.dataset['websiteId']).toBe(TEST_CONFIG.websiteId);
  });

  it('should wait until the first navigation ended', async () => {
    const router = setUp();
    let loadedBeforeEnd = false;

    router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd) && trackerScript()) {
        loadedBeforeEnd = true;
      }
    });
    await router.navigateByUrl('/de/projects');

    expect(loadedBeforeEnd).toBe(false);
    expect(trackerScript()).not.toBeNull();
  });

  it('should not load the tracker without a website ID', async () => {
    const router = setUp({ websiteId: '' });

    await router.navigateByUrl('/');

    expect(trackerScript()).toBeNull();
  });

  it('should not load the tracker on another host', async () => {
    const router = setUp({ host: 'barooni.dev.invalid' });

    await router.navigateByUrl('/');

    expect(trackerScript()).toBeNull();
  });

  it('should not load the tracker during prerendering', async () => {
    const router = setUp({}, 'server');

    await router.navigateByUrl('/');

    expect(trackerScript()).toBeNull();
  });
});
