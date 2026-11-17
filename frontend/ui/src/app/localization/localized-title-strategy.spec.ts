import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter, Router, TitleStrategy } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { beforeEach, describe, expect, it } from 'vitest';

import { localizationTestingModule } from '../../testing/localization-testing';
import { LocalizedTitleStrategy } from './localized-title-strategy';

@Component({ template: '' })
class EmptyPage {}

describe('LocalizedTitleStrategy', () => {
  let router: Router;
  let title: Title;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [localizationTestingModule()],
      providers: [
        provideRouter([
          {
            path: 'projects',
            component: EmptyPage,
            title: 'pageTitles.projects',
          },
          {
            path: 'blog/:slug',
            component: EmptyPage,
            title: 'pageTitles.post',
          },
          { path: 'plain', component: EmptyPage, title: 'A plain title' },
        ]),
        { provide: TitleStrategy, useClass: LocalizedTitleStrategy },
      ],
    });

    router = TestBed.inject(Router);
    title = TestBed.inject(Title);
  });

  it('translates the title of a page', async () => {
    await router.navigateByUrl('/projects');

    expect(title.getTitle()).toBe('Projects | Ehsan Barooni');
  });

  it('uses the translated post title on a post page', async () => {
    await router.navigateByUrl('/blog/moving-away-from-firebase-hosting');

    expect(title.getTitle()).toBe(
      'Moving away from Firebase Hosting | Ehsan Barooni',
    );
  });

  it('changes the title when the language changes', async () => {
    await router.navigateByUrl('/blog/from-astro-to-angular');

    TestBed.inject(TranslocoService).setActiveLang('de');

    expect(title.getTitle()).toBe(
      'Von Astro zu Angular: Warum ich mein Portfolio neu gebaut habe | Ehsan Barooni',
    );
  });

  it('keeps a title that is not a translation key', async () => {
    await router.navigateByUrl('/plain');

    expect(title.getTitle()).toBe('A plain title');
  });
});
