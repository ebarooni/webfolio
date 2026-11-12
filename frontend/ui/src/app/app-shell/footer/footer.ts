import { NgClass } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import { Route } from '../../config/route';
import { Github } from './github/github';
import { Gitlab } from './gitlab/gitlab';
import { Linkedin } from './linkedin/linkedin';
import { Stackoverflow } from './stackoverflow/stackoverflow';

type SocialId = 'github' | 'gitlab' | 'stackoverflow' | 'linkedin';

type SocialLink = Readonly<{
  id: SocialId;
  label: string;
  href: string;
}>;

type VersionToast = Readonly<
  { kind: 'tapsLeft'; count: number } | { kind: 'developerMode' }
>;

const TAPS_TO_ENABLE_DEVELOPER_MODE = 7;
const TAPS_BEFORE_COUNTDOWN = 4;
const COUNTDOWN_TOAST_MS = 1500;
const DEVELOPER_MODE_TOAST_MS = 3000;

@Component({
  selector: 'app-footer',
  imports: [
    Github,
    Gitlab,
    Linkedin,
    NgClass,
    RouterLink,
    Stackoverflow,
    TranslocoDirective,
  ],
  templateUrl: './footer.html',
})
export class Footer {
  private readonly destroyRef = inject(DestroyRef);

  private versionTapCount = 0;
  private toastTimeoutId = 0;

  readonly bgClass = input.required<string>();
  readonly version = input('');
  readonly developerMode = input(false);
  readonly developerModeEnabled = output();

  readonly currentYear = new Date().getFullYear();
  readonly buildInfoLink = `/${Route.BUILD_INFO}`;
  readonly versionToast = signal<VersionToast | null>(null);

  readonly links: readonly SocialLink[] = [
    { id: 'github', label: 'GitHub', href: 'https://github.com/ebarooni' },
    { id: 'gitlab', label: 'GitLab', href: 'https://gitlab.com/ebarooni' },
    {
      id: 'stackoverflow',
      label: 'Stack Overflow',
      href: 'https://stackoverflow.com/users/13690331/ebarooni',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/barooni',
    },
  ];

  constructor() {
    this.destroyRef.onDestroy(() => {
      window.clearTimeout(this.toastTimeoutId);
    });
  }

  // Seven taps on the version open the build details, as on Android.
  tapVersion(): void {
    this.versionTapCount += 1;

    if (this.versionTapCount >= TAPS_TO_ENABLE_DEVELOPER_MODE) {
      this.versionTapCount = 0;
      this.showToast({ kind: 'developerMode' }, DEVELOPER_MODE_TOAST_MS);
      this.developerModeEnabled.emit();
      return;
    }

    if (this.versionTapCount >= TAPS_BEFORE_COUNTDOWN) {
      const count = TAPS_TO_ENABLE_DEVELOPER_MODE - this.versionTapCount;
      this.showToast({ kind: 'tapsLeft', count }, COUNTDOWN_TOAST_MS);
    }
  }

  private showToast(toast: VersionToast, durationMs: number): void {
    this.versionToast.set(toast);
    window.clearTimeout(this.toastTimeoutId);
    this.toastTimeoutId = window.setTimeout(() => {
      this.versionToast.set(null);
    }, durationMs);
  }
}
