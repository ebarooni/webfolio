import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { GithubComponent } from '../../svg-components/github/github.component';
import { GitlabComponent } from '../../svg-components/gitlab/gitlab.component';
import { LinkedinComponent } from '../../svg-components/linkedin/linkedin.component';
import { StackoverflowComponent } from '../../svg-components/stackoverflow/stackoverflow.component';

type SocialId = 'github' | 'gitlab' | 'stackoverflow' | 'linkedin' | 'xing';

type SocialLink = Readonly<{
  id: SocialId;
  label: string;
  href: string;
  icon: SocialId | null;
}>;

@Component({
  selector: 'app-footer',
  imports: [GitlabComponent, GithubComponent, LinkedinComponent, StackoverflowComponent],
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
