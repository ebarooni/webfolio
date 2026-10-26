import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { Theme } from '../../../../config/themes-array';
import { BookmarkStatusShot } from '../../shot/shot';
import { heroCopy } from '../hero.copy';

@Component({
  selector: 'app-bookmark-status-hero-visual',
  imports: [BookmarkStatusShot],
  templateUrl: './hero-visual.html',
  styleUrl: './hero-visual.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkStatusHeroVisual {
  readonly theme = input.required<Theme>();
  readonly copy = heroCopy;
}
