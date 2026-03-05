import {
  Directive,
  ElementRef,
  effect,
  inject,
  input,
  Renderer2,
} from '@angular/core';
import { Theme } from '../../config/constants/themes-array';

@Directive({
  selector: '[appDataTheme]',
  standalone: true,
})
export class DataTheme {
  readonly theme = input.required<Theme>({ alias: 'appDataTheme' });

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);

  constructor() {
    effect(() => {
      this.renderer.setAttribute(
        this.el.nativeElement,
        'data-theme',
        this.theme(),
      );
    });
  }
}
