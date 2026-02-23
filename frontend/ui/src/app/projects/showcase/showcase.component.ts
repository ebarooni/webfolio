import { Component } from '@angular/core';
import {
  ProjectItemComponent,
  type ProjectItem,
} from './project-item/project-item.component';

@Component({
  selector: 'app-showcase',
  imports: [ProjectItemComponent],
  templateUrl: './showcase.component.html',
})
export class ShowcaseComponent {
  readonly projects: readonly ProjectItem[] = [
    {
      title: 'Capacitor Calendar Plugin',
      href: 'https://github.com/ebarooni/capacitor-calendar',
      description:
        'A Capacitor plugin for interacting with native calendars, providing features to create, update, delete, and query events on iOS and Android.',
      features: ['CapacitorJS', 'iOS', 'Android'],
    },
    {
      title: 'Webfolio',
      href: 'https://github.com/ebarooni/webfolio',
      description:
        'A personal portfolio website developed with Angular, TailwindCSS and DaisyUI.',
      features: ['Angular', 'TailwindCSS', 'DaisyUI'],
    },
    {
      title: 'Capawesome',
      href: 'https://github.com/capawesome-team',
      description:
        'A set of enterprise-grade solutions and services for developing cross-platform apps with Capacitor.',
      features: ['CapacitorJS', 'Cross-platform', 'Enterprise'],
    },
    {
      title: 'Web Configs',
      href: 'https://github.com/ebarooni/dev-tools',
      description:
        'A collection of shared configuration including ESLint, Prettier, Stylelint and Swiftlint.',
      features: ['ESLint', 'Prettier', 'Stylelint', 'Swiftlint'],
    },
    {
      title: 'Repo Sync',
      href: 'https://gist.github.com/ebarooni/c268a88bf8e09175b5017a176f46b31e',
      description:
        'A github workflow that mirrors the repositories to another remote on every push.',
      features: ['GitHub', 'GitLab', 'CI/CD'],
    },
    {
      title: 'CloudCost Tracker',
      href: 'https://github.com/ebarooni',
      description:
        'A cost tracker that uses Pub/Sub topics to centralize the billing information of multiple Google Cloud projects.',
      features: ['Google Cloud', 'Billing', 'Pub/Sub'],
    },
    {
      title: 'Spotify Auth Integration',
      href: 'https://github.com/ebarooni/spotify-web-api-playground',
      description:
        'A web application to generate access tokens to fetch user data from the Spotify web API.',
      features: ['Spotify', 'API', 'Angular'],
    },
  ] as const;
}
