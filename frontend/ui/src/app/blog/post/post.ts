import { NgTemplateOutlet } from '@angular/common';
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
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { map } from 'rxjs';

import { Route } from '../../config/route';
import { ArrowIcon } from '../../shared/components/arrow-icon/arrow-icon';
import { ShortDate } from '../../shared/short-date/short-date';
import { findPostBySlug, Posts } from '../post-catalog';
import { AstroToAngular } from '../posts/astro-to-angular/astro-to-angular';
import { VpsHosting } from '../posts/vps-hosting/vps-hosting';

type Heading = Readonly<{ id: string; text: string }>;

function toAnchorId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

@Component({
  selector: 'app-blog-post',
  imports: [
    ArrowIcon,
    AstroToAngular,
    NgTemplateOutlet,
    RouterLink,
    ShortDate,
    TranslocoDirective,
    VpsHosting,
  ],
  templateUrl: './post.html',
})
export class BlogPost {
  private readonly translocoService = inject(TranslocoService);

  private readonly slug = toSignal(
    inject(ActivatedRoute).paramMap.pipe(
      map((parameters) => parameters.get('slug') ?? ''),
    ),
    { initialValue: '' },
  );

  private readonly content = viewChild<ElementRef<HTMLElement>>('content');

  readonly language = toSignal(this.translocoService.langChanges$, {
    initialValue: this.translocoService.getActiveLang(),
  });

  readonly blogLink = `/${Route.BLOG}`;
  readonly posts = Posts;
  readonly post = computed(() => findPostBySlug(this.slug()));
  readonly headings = signal<readonly Heading[]>([]);

  constructor() {
    // The contents list comes from the section titles of the post.
    afterRenderEffect(() => {
      this.post();

      const sectionTitles =
        this.content()?.nativeElement.querySelectorAll('h2') ?? [];

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
