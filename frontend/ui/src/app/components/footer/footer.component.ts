import { Component, input, signal } from '@angular/core';
import { GithubComponent } from '../../svg-components/github/github.component';
import { GitlabComponent } from '../../svg-components/gitlab/gitlab.component';
import { LinkedinComponent } from '../../svg-components/linkedin/linkedin.component';
import { NgClass } from '@angular/common';
import { StackoverflowComponent } from '../../svg-components/stackoverflow/stackoverflow.component';
import { XingComponent } from '../../svg-components/xing/xing.component';

@Component({
  imports: [
    GitlabComponent,
    GithubComponent,
    LinkedinComponent,
    StackoverflowComponent,
    NgClass,
    XingComponent,
  ],
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly colorClass = input.required<string>();
  readonly currentYear = signal(new Date().getFullYear());
}
