import {
  Directive,
  ElementRef,
  inject,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Theme } from '../../config/constants/themes-array';

@Directive({
  selector: '[appDataTheme]',
})
export class DataThemeDirective implements OnInit {
  @Input('appDataTheme') theme!: Theme;

  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  ngOnInit() {
    this.renderer.setAttribute(this.el.nativeElement, 'data-theme', this.theme);
  }
}
