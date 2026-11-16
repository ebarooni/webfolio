import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  ActivatedRoute,
  convertToParamMap,
  provideRouter,
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { beforeEach, describe, expect, it } from 'vitest';

import { localizationTestingModule } from '../../../testing/localization-testing';
import { BLOG_POSTS } from '../post-catalog';
import { BlogPost } from './post';

describe('BlogPost', () => {
  const vpsPost = BLOG_POSTS[0];
  const astroPost = BLOG_POSTS[1];

  let fixture: ComponentFixture<BlogPost>;
  let parameters: BehaviorSubject<ReturnType<typeof convertToParamMap>>;

  function text(selector: string): string {
    return (
      fixture.debugElement.query(By.css(selector)).nativeElement as HTMLElement
    ).textContent
      .replace(/\s+/g, ' ')
      .trim();
  }

  async function openPost(slug: string): Promise<void> {
    parameters.next(convertToParamMap({ slug }));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  beforeEach(async () => {
    parameters = new BehaviorSubject(convertToParamMap({ slug: vpsPost.slug }));

    await TestBed.configureTestingModule({
      imports: [BlogPost, localizationTestingModule()],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { paramMap: parameters.asObservable() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogPost);
    await openPost(vpsPost.slug);
  });

  it('should show the title, the date and the read time of the post', () => {
    expect(text('h1')).toBe(vpsPost.title);
    expect(text('header .meta-label')).toBe('Apr 4, 2026 · 10 min read');
  });

  it('should link back to the list of posts', () => {
    const back = fixture.debugElement.query(By.css('header a'))
      .nativeElement as HTMLAnchorElement;

    expect(back.getAttribute('href')).toBe('/blog');
    expect(back.textContent.trim()).toBe('All posts');
  });

  it('should render the content of the post', () => {
    expect(
      fixture.debugElement.query(By.css('app-vps-hosting')),
    ).not.toBeNull();
    expect(
      fixture.debugElement.query(By.css('app-astro-to-angular')),
    ).toBeNull();
  });

  it('should list the section titles and give each section an anchor', () => {
    const links = fixture.debugElement
      .queryAll(By.css('nav details a'))
      .map((link) => link.nativeElement as HTMLAnchorElement);

    expect(links[0].textContent.trim()).toBe('Why I Left Firebase Hosting');
    expect(links[0].getAttribute('href')).toContain(
      '#why-i-left-firebase-hosting',
    );
    expect(
      fixture.debugElement.query(By.css('#why-i-left-firebase-hosting')),
    ).not.toBeNull();
  });

  it('should show the other post after the address changes', async () => {
    await openPost(astroPost.slug);

    expect(text('h1')).toBe(astroPost.title);
    expect(
      fixture.debugElement.query(By.css('app-astro-to-angular')),
    ).not.toBeNull();
  });

  it('should render nothing for an unknown post', async () => {
    await openPost('unknown');

    expect(fixture.debugElement.query(By.css('h1'))).toBeNull();
  });
});
