import { Directive, input } from '@angular/core';
import { Theme } from '../../config/themes-array';

@Directive({
  selector: '[appDataTheme]',
  host: {
    '[attr.data-theme]': 'theme()',
  },
})
export class DataTheme {
  readonly theme = input.required<Theme>({ alias: 'appDataTheme' });
}
