import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Github } from './github/github';
import { Gitlab } from './gitlab/gitlab';
import { Linkedin } from './linkedin/linkedin';
import { Stackoverflow } from './stackoverflow/stackoverflow';

type SocialId = 'github' | 'gitlab' | 'stackoverflow' | 'linkedin' | 'xing';

type SocialLink = Readonly<{
  id: SocialId;
  label: string;
  href: string;
  icon: SocialId | null;
}>;

@Component({
  selector: 'app-footer',
  imports: [Gitlab, Github, Linkedin, Stackoverflow],
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  readonly bgClass = input.required<string>();

  readonly currentYear = new Date().getFullYear();

  readonly links = input<readonly SocialLink[]>([
    { id: 'github', label: 'GitHub', href: 'https://github.com/ebarooni', icon: 'github' },
    { id: 'gitlab', label: 'GitLab', href: 'https://gitlab.com/ebarooni', icon: 'gitlab' },
    {
      id: 'stackoverflow',
      label: 'Stack Overflow',
      href: 'https://stackoverflow.com/users/13690331/ebarooni',
      icon: 'stackoverflow',
    },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/barooni', icon: 'linkedin' },
  ] as const);

  trackById = (_: number, item: SocialLink) => item.id;
}
