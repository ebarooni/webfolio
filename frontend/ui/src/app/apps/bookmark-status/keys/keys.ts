import { Component, input } from '@angular/core';

@Component({
  selector: 'app-bookmark-status-keys',
  templateUrl: './keys.html',
  styleUrl: './keys.css',
})
export class BookmarkStatusKeys {
  readonly label = input.required<string>();
  readonly keys = input.required<readonly string[]>();
}
