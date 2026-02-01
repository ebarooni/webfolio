import { Component, ElementRef, ViewChild, input, output } from '@angular/core';
import { Theme, themesArray } from '../../config/constants/themes-array';
import { DataThemeDirective } from '../../directives/data-theme/data-theme.directive';
import { NgClass } from '@angular/common';

@Component({
  imports: [DataThemeDirective, NgClass],
  selector: 'app-theme-selector-modal',
  templateUrl: './theme-selector-modal.component.html',
})
export class ThemeSelectorModalComponent {
  @ViewChild('modal') private readonly modal?: ElementRef<HTMLDialogElement>;
  public readonly selectedTheme = input.required<Theme>();
  public readonly themeChanged = output<Theme>();

  get themes(): Theme[] {
    return themesArray;
  }

  public showModal(): void {
    this.modal?.nativeElement.showModal();
  }
}
