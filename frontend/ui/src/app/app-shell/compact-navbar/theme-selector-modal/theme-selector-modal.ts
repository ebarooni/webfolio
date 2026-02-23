import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  viewChild,
  input,
  output,
} from '@angular/core';

import { Theme, themesArray } from '../../../config/constants/themes-array';
import { DataThemeDirective } from '../../../directives/data-theme/data-theme.directive';

@Component({
  selector: 'app-theme-selector-modal',
  imports: [DataThemeDirective],
  templateUrl: './theme-selector-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSelectorModal {
  readonly selectedTheme = input.required<Theme>();
  readonly themeChanged = output<Theme>();

  readonly themes: readonly Theme[] = themesArray;

  private readonly modal = viewChild<ElementRef<HTMLDialogElement>>('modal');

  showModal(): void {
    this.modal()?.nativeElement.showModal();
  }
}
