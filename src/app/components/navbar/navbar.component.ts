import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationHelper } from '../../extends/navigation-helper';
import { Theme } from 'daisyui';
import { DataThemeDirective } from '../../directives/data-theme/data-theme.directive';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, DataThemeDirective],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent extends NavigationHelper {
  @Output() themeChanged = new EventEmitter<Theme>();
}
