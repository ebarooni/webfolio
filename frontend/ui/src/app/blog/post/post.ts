import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import {
  afterRenderEffect,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { map } from 'rxjs';

import { Route } from '../../config/route';
import { injectActiveLanguage } from '../../localization/active-language';
import { ArrowIcon } from '../../shared/components/arrow-icon/arrow-icon';
import { ArrowLink } from '../../shared/components/arrow-link/arrow-link';
import { ShortDate } from '../../shared/short-date/short-date';
import { DEFAULT_LANGUAGE, isLanguage } from '../../config/languages';
import { findPostBySlug } from '../post-catalog';
import { postTitleTransitionName } from '../post-title-transition';
import { POST_CONTENT } from '../posts/post-content';

type Heading = Readonly<{ id: string; text: string }>;

function toAnchorId(text: string): string {
  return text
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

@Component({
  selector: 'app-blog-post',
  imports: [
    ArrowIcon,
    ArrowLink,
    NgComponentOutlet,
    NgTemplateOutlet,
    RouterLink,
    ShortDate,
    TranslocoDirective,
  ],
  templateUrl: './post.html',
})
export class BlogPost {
  private readonly slug = toSignal(
    inject(ActivatedRoute).paramMap.pipe(
      map((parameters) => parameters.get('slug') ?? ''),
    ),
    { initialValue: '' },
  );

  private readonly contentElement =
    viewChild<ElementRef<HTMLElement>>('content');

  readonly language = injectActiveLanguage();

  readonly blogLink = `/${Route.BLOG}`;
  readonly post = computed(() => findPostBySlug(this.slug()));
  readonly postContent = computed(() => {
    const post = this.post();
    const language = this.language();

    if (!post) {
      return null;
    }

    return POST_CONTENT[post.id][
      isLanguage(language) ? language : DEFAULT_LANGUAGE
    ];
  });
  readonly headings = signal<readonly Heading[]>([]);
  readonly titleTransitionName = computed(() =>
    postTitleTransitionName(this.post()?.slug ?? ''),
  );

  constructor() {
    // The contents list comes from the section titles of the post.
    afterRenderEffect(() => {
      this.postContent();

      const sectionTitles =
        this.contentElement()?.nativeElement.querySelectorAll('h2') ?? [];

      this.headings.set(
        Array.from(sectionTitles, (sectionTitle) => {
          const text = sectionTitle.textContent.replace(/\s+/g, ' ').trim();

          sectionTitle.id = toAnchorId(text);

          return { id: sectionTitle.id, text };
        }),
      );
    });
  }
}
