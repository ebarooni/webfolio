import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';

import { AppStore } from '../../store/app/app.store';
import { BookmarkStatusBento } from './bento/bento';
import { BookmarkStatusCallToAction } from './call-to-action/call-to-action';
import { BookmarkStatusFaq } from './faq/faq';
import { BookmarkStatusHero } from './hero/hero';
import { BookmarkStatusPrivacy } from './privacy/privacy';
import { BookmarkStatusSteps } from './steps/steps';
import {
  PAGE_CANONICAL,
  PAGE_JSON_LD,
  PAGE_META,
  PAGE_TITLE,
  bookmarkStatusCopy,
  type PageMetaTag,
} from './bookmark-status.copy';

type PreviousMeta = Readonly<{
  attr: PageMetaTag['attr'];
  key: string;
  content: string | null;
}>;

@Component({
  selector: 'app-bookmark-status',
  imports: [
    BookmarkStatusHero,
    BookmarkStatusBento,
    BookmarkStatusSteps,
    BookmarkStatusPrivacy,
    BookmarkStatusFaq,
    BookmarkStatusCallToAction,
  ],
  templateUrl: './bookmark-status.html',
  styleUrl: './bookmark-status.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bookmark-status-page flex flex-1 flex-col',
  },
})
export class BookmarkStatusPage implements OnInit, OnDestroy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);
  private readonly appStore = inject(AppStore);

  private readonly previousMeta: PreviousMeta[] = [];
  private previousTitle = '';
  private canonicalLink: HTMLLinkElement | null = null;
  private jsonLdScript: HTMLScriptElement | null = null;

  readonly copy = bookmarkStatusCopy;
  readonly theme = toSignal(this.appStore.selectTheme$, {
    initialValue: 'light',
  });

  ngOnInit(): void {
    this.previousTitle = this.title.getTitle();
    this.title.setTitle(PAGE_TITLE);

    for (const tag of PAGE_META) {
      this.setMeta(tag);
    }

    this.addCanonical();
    this.addJsonLd();
  }

  ngOnDestroy(): void {
    if (this.title.getTitle() === PAGE_TITLE) {
      this.title.setTitle(this.previousTitle);
    }

    for (const tag of this.previousMeta) {
      const selector = `${tag.attr}="${tag.key}"`;

      if (tag.content === null) {
        this.meta.removeTag(selector);
        continue;
      }

      if (tag.attr === 'name') {
        this.meta.updateTag({ name: tag.key, content: tag.content }, selector);
        continue;
      }

      this.meta.updateTag(
        { property: tag.key, content: tag.content },
        selector,
      );
    }

    if (this.canonicalLink) {
      this.renderer.removeChild(this.document.head, this.canonicalLink);
      this.canonicalLink = null;
    }

    if (this.jsonLdScript) {
      this.renderer.removeChild(this.document.head, this.jsonLdScript);
      this.jsonLdScript = null;
    }
  }

  private setMeta(tag: PageMetaTag): void {
    const selector = `${tag.attr}="${tag.key}"`;
    const existing = this.meta.getTag(selector);

    this.previousMeta.push({
      attr: tag.attr,
      key: tag.key,
      content: existing?.content ?? null,
    });

    if (tag.attr === 'name') {
      this.meta.updateTag({ name: tag.key, content: tag.content }, selector);
      return;
    }

    this.meta.updateTag({ property: tag.key, content: tag.content }, selector);
  }

  private addCanonical(): void {
    const link = this.renderer.createElement('link') as HTMLLinkElement;
    this.renderer.setAttribute(link, 'rel', 'canonical');
    this.renderer.setAttribute(link, 'href', PAGE_CANONICAL);
    this.renderer.appendChild(this.document.head, link);
    this.canonicalLink = link;
  }

  private addJsonLd(): void {
    const script = this.renderer.createElement('script') as HTMLScriptElement;
    this.renderer.setAttribute(script, 'type', 'application/ld+json');
    this.renderer.setProperty(script, 'text', JSON.stringify(PAGE_JSON_LD));
    this.renderer.appendChild(this.document.head, script);
    this.jsonLdScript = script;
  }
}
