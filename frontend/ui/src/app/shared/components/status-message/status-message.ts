import { Component, input } from '@angular/core';

export type StatusTone = 'success' | 'error';

/** A short result message with an icon, for example after a form submit. */
@Component({
  selector: 'app-status-message',
  templateUrl: './status-message.html',
})
export class StatusMessage {
  readonly tone = input.required<StatusTone>();
  readonly title = input.required<string>();
  readonly body = input.required<string>();
}
