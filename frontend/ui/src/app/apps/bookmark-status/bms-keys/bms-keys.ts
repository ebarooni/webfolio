import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-bms-keys',
  templateUrl: './bms-keys.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmsKeys {
  readonly label = input.required<string>();
  readonly keys = input.required<readonly string[]>();
}
