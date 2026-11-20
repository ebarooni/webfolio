import { Component } from '@angular/core';

import { CodeBlock } from '../code/code-block/code-block';
import { HERO_SNIPPET } from '../code/snippets';

/**
 * The code of the quick start next to the event that it creates. The event
 * card is a drawing in HTML, not a screenshot of a device.
 */
@Component({
  selector: 'app-hero-visual',
  imports: [CodeBlock],
  templateUrl: './hero-visual.html',
  styleUrl: './hero-visual.css',
})
export class HeroVisual {
  readonly snippet = HERO_SNIPPET;
}
