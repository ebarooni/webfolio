import { Component } from '@angular/core';

import { Reveal } from '../../../shared/reveal/reveal';
import { privacyCopy } from './privacy.copy';

@Component({
  selector: 'app-bookmark-status-privacy',
  imports: [Reveal],
  templateUrl: './privacy.html',
  styleUrl: './privacy.css',
})
export class BookmarkStatusPrivacy {
  readonly copy = {
    privacy: privacyCopy,
  };
}
