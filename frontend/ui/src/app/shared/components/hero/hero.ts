import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  imports: [NgClass],
  selector: 'app-hero',
  templateUrl: './hero.html',
})
export class Hero {
  public backgroundColor = input.required<string>();
  public titleColor = input.required<string>();
  public subtitleColor = input.required<string>();
}
