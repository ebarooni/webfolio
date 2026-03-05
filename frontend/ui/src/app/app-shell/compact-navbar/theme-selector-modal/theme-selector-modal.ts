import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  viewChild,
  input,
  output,
} from '@angular/core';

import { Theme, themesArray } from '../../../config/constants/themes-array';
import { DataTheme } from '../../data-theme/data-theme';

@Component({
  selector: 'app-theme-selector-modal',
  imports: [DataTheme],
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
