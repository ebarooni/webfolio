import { Component, computed, inject } from '@angular/core';

import { SiteLanguage } from '../../../localization/site-language';
import { Reveal } from '../../../shared/reveal/reveal';
import { privacyCopy } from './privacy.copy';

@Component({
  selector: 'app-bookmark-status-privacy',
  imports: [Reveal],
  templateUrl: './privacy.html',
  styleUrl: './privacy.css',
})
export class BookmarkStatusPrivacy {
  private readonly language = inject(SiteLanguage).current;
  readonly copy = computed(() => {
    const language = this.language();

    return {
      privacy: privacyCopy[language],
    };
  });
}
