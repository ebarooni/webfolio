import { Component, ElementRef, input, output, ViewChild } from '@angular/core';
import { Theme } from 'daisyui';
import { DataThemeDirective } from '../../directives/data-theme/data-theme.directive';
import { themesArray } from '../../constants/themes-array';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-theme-selector-modal',
  templateUrl: './theme-selector-modal.component.html',
  imports: [DataThemeDirective, NgClass],
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
