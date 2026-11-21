import { Component, computed, inject } from '@angular/core';

import { SiteLanguage } from '../../../localization/site-language';
import { Reveal } from '../../../shared/reveal/reveal';
import { faqCopy } from './faq.copy';
import { BookmarkStatusKeys } from '../keys/keys';

@Component({
  selector: 'app-bookmark-status-faq',
  imports: [Reveal, BookmarkStatusKeys],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class BookmarkStatusFaq {
  private readonly language = inject(SiteLanguage).current;
  readonly copy = computed(() => {
    const language = this.language();

    return {
      faq: faqCopy[language],
    };
  });
}
