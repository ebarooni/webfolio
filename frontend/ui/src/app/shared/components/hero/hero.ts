import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [NgClass],
  templateUrl: './hero.html',
})
export class Hero {
  public backgroundClass = input<string>('');
  public titleClass = input<string>('');
  public subtitleClass = input<string>('text-neutral-content');
}
