import { NgTemplateOutlet } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import { Language } from '../../config/languages';
import { Route } from '../../config/route';
import { Theme } from '../../config/themes-array';
import { Brand } from '../brand/brand';
import { LanguageSwitch } from '../language-switch/language-switch';
import { ThemeSwitch } from '../theme-switch/theme-switch';

type NavItem = Readonly<{
  labelKey: string;
  link: string;
  fragment?: string;
}>;

@Component({
  selector: 'app-navbar',
  imports: [
    Brand,
    LanguageSwitch,
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
    ThemeSwitch,
    TranslocoDirective,
  ],
  templateUrl: './navbar.html',
})
export class Navbar {
  readonly selectedTheme = input.required<Theme>();
  readonly selectedLanguage = input.required<Language>();
  readonly themeChanged = output<Theme>();
  readonly languageChanged = output<Language>();

  readonly navItems: readonly NavItem[] = [
    { labelKey: 'work', link: `/${Route.PROJECTS}` },
    { labelKey: 'writing', link: `/${Route.BLOG}` },
    { labelKey: 'about', link: `/${Route.HOME}`, fragment: 'experience' },
    { labelKey: 'contact', link: `/${Route.CONTACT}` },
  ];
}
