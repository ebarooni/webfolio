import { Component, ElementRef, ViewChild, input, output } from '@angular/core';
import { DataThemeDirective } from '../../directives/data-theme/data-theme.directive';
import { NgClass } from '@angular/common';
import { Theme } from 'daisyui';
import { themesArray } from '../../constants/themes-array';

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
