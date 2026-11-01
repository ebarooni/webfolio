import { Component } from '@angular/core';

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
  readonly copy = {
    faq: faqCopy,
  };
}
