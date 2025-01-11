import { Component, signal } from '@angular/core';
import { GitlabComponent } from '../../svg-components/gitlab/gitlab.component';
import { GithubComponent } from '../../svg-components/github/github.component';
import { LinkedinComponent } from '../../svg-components/linkedin/linkedin.component';
import { StackoverflowComponent } from '../../svg-components/stackoverflow/stackoverflow.component';

@Component({
  selector: 'app-footer',
  imports: [
    GitlabComponent,
    GithubComponent,
    LinkedinComponent,
    StackoverflowComponent,
  ],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly currentYear = signal(new Date().getFullYear());
}
