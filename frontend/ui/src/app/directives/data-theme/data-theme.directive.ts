import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Theme } from '../../config/constants/themes-array';

@Directive({
  selector: '[appDataTheme]',
})
export class DataThemeDirective implements OnInit {
  @Input('appDataTheme') theme!: Theme;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.renderer.setAttribute(this.el.nativeElement, 'data-theme', this.theme);
  }
}
