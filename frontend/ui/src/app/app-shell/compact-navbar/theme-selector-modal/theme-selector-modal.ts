import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';

import { Theme, themesArray } from '../../../config/themes-array';
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

  readonly themes = themesArray;

  private readonly modal =
    viewChild.required<ElementRef<HTMLDialogElement>>('modal');

  showModal(): void {
    const modal = this.modal().nativeElement;

    if (!modal.open) {
      modal.showModal();
    }
  }

  closeModal(): void {
    const modal = this.modal().nativeElement;

    if (modal.open) {
      modal.close();
    }
  }

  selectTheme(theme: Theme): void {
    this.themeChanged.emit(theme);
    this.closeModal();
  }
}
