import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  convertToParamMap,
  provideRouter,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { BLOG_POSTS } from '../post-catalog';
import { postExistsGuard } from './post-exists-guard';

describe('postExistsGuard', () => {
  function runGuard(slug: string, language = 'en'): unknown {
    const route = {
      paramMap: convertToParamMap({ slug }),
      pathFromRoot: [{ data: { language } }],
    } as unknown as ActivatedRouteSnapshot;

    return TestBed.runInInjectionContext(() =>
      postExistsGuard(route, {} as RouterStateSnapshot),
    );
  }

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  it('should open a post that exists', () => {
    expect(runGuard(BLOG_POSTS[0].slug)).toBe(true);
  });

  it('should send an unknown address to the list of posts', () => {
    const result = runGuard('unknown');

    expect(result).toBeInstanceOf(UrlTree);
    expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toBe(
      '/blog',
    );
  });

  it('should keep the language of the address', () => {
    const result = runGuard('unknown', 'nl');

    expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toBe(
      '/nl/blog',
    );
  });
});
