import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-github',
  templateUrl: './github.html',
  styleUrl: './github.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Github {}
