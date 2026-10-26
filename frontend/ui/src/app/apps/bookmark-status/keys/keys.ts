import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-bookmark-status-keys',
  templateUrl: './keys.html',
  styleUrl: './keys.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkStatusKeys {
  readonly label = input.required<string>();
  readonly keys = input.required<readonly string[]>();
}
