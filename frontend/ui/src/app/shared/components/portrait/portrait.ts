import { NgOptimizedImage } from '@angular/common';
import { booleanAttribute, Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-portrait',
  imports: [NgOptimizedImage],
  templateUrl: './portrait.html',
  host: {
    class: 'relative block overflow-hidden bg-base-200',
  },
})
export class Portrait {
  readonly alt = input.required<string>();
  readonly isPriority = input(false, { transform: booleanAttribute });

  // The initials replace the photo when the file is not there.
  readonly hasFailed = signal(false);
}
