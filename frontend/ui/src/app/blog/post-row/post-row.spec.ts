import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { localizationTestingModule } from '../../../testing/localization-testing';
import { BLOG_POSTS } from '../post-catalog';
import { PostRow } from './post-row';

describe('PostRow', () => {
  let fixture: ComponentFixture<PostRow>;
  const post = BLOG_POSTS[0];

  function root(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostRow, localizationTestingModule()],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PostRow);
    fixture.componentRef.setInput('post', post);
    fixture.detectChanges();
  });

  it('links to the post page', () => {
    expect(root().querySelector('a')?.getAttribute('href')).toBe(
      `/blog/${post.slug}`,
    );
  });

  it('shows the date, a level 3 title and the read time', () => {
    expect(root().querySelector('time')?.getAttribute('datetime')).toBe(
      post.date.toISOString(),
    );
    expect(root().querySelector('h3')?.textContent.trim()).toBe(post.title);
    expect(root().textContent).toContain(`${post.readTime} min read`);
  });

  it('gives the title the transition name of the post', () => {
    const title = root().querySelector<HTMLElement>('h3');

    expect(title?.style.viewTransitionName).toBe(`post-title-${post.slug}`);
  });

  it('does not show the summary by default', () => {
    expect(root().textContent).not.toContain(post.summary);
  });

  it('shows a level 2 title and the summary on the blog page', () => {
    fixture.componentRef.setInput('headingLevel', 2);
    fixture.componentRef.setInput('showSummary', true);
    fixture.detectChanges();

    expect(root().querySelector('h2')?.textContent.trim()).toBe(post.title);
    expect(root().querySelector('h3')).toBeNull();
    expect(root().textContent).toContain(post.summary);
  });
});
