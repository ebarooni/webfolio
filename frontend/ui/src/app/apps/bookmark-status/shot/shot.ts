import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { BOOKMARK_STATUS_ASSET_BASE } from '../bookmark-status.copy';
import type { Theme } from '../../../config/themes-array';

@Component({
  selector: 'app-bookmark-status-shot',
  templateUrl: './shot.html',
  styleUrl: './shot.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClass()',
  },
})
export class BookmarkStatusShot {
  readonly name = input.required<string>();
  readonly theme = input.required<Theme>();
  readonly alt = input.required<string>();
  readonly width = input.required<number>();
  readonly height = input.required<number>();
  readonly frameClass = input('');
  readonly eager = input(false);
  readonly priority = input(false);

  readonly hostClass = computed(() => {
    return `bookmark-status-frame ${this.frameClass()}`.trim();
  });

  readonly source = computed(() => {
    const variant = this.theme() === 'dark' ? 'dark' : 'light';
    const file = `${this.name()}-${variant}`;
    const base = `${BOOKMARK_STATUS_ASSET_BASE}/shots/${file}`;

    return {
      src: `${base}.webp`,
      srcset: `${base}.webp 1x, ${base}@2x.webp 2x`,
    };
  });
}
