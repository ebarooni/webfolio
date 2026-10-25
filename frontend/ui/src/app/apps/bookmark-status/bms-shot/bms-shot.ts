import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { BMS_ASSET_BASE } from '../bookmark-status.copy';
import type { Theme } from '../../../config/themes-array';

@Component({
  selector: 'app-bms-shot',
  templateUrl: './bms-shot.html',
  styleUrl: './bms-shot.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClass()',
  },
})
export class BmsShot {
  readonly name = input.required<string>();
  readonly theme = input.required<Theme>();
  readonly alt = input.required<string>();
  readonly width = input.required<number>();
  readonly height = input.required<number>();
  readonly frameClass = input('');
  readonly eager = input(false);
  readonly priority = input(false);

  readonly hostClass = computed(() => {
    return `bms-frame ${this.frameClass()}`.trim();
  });

  readonly source = computed(() => {
    const variant = this.theme() === 'dark' ? 'dark' : 'light';
    const file = `${this.name()}-${variant}`;
    const base = `${BMS_ASSET_BASE}/shots/${file}`;

    return {
      src: `${base}.webp`,
      srcset: `${base}.webp 1x, ${base}@2x.webp 2x`,
    };
  });
}
