import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Reveal } from '../../../shared/reveal/reveal';
import { privacyCopy } from './privacy.copy';

@Component({
  selector: 'app-bookmark-status-privacy',
  imports: [Reveal],
  templateUrl: './privacy.html',
  styleUrl: './privacy.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkStatusPrivacy {
  readonly copy = {
    privacy: privacyCopy,
  };
}
