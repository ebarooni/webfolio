import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-stackoverflow',
  templateUrl: './stackoverflow.html',
  styleUrl: './stackoverflow.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Stackoverflow {}
