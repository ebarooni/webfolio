import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [NgClass],
  templateUrl: './hero.html',
})
export class Hero {
  public readonly backgroundClass = input<string>('');
  public readonly titleClass = input<string>('');
  public readonly subtitleClass = input<string>('text-neutral-content');
}
