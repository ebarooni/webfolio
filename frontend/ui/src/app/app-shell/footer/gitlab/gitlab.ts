import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-gitlab',
  templateUrl: './gitlab.html',
  styleUrl: './gitlab.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Gitlab {}
