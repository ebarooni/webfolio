import { Component, computed, input } from '@angular/core';

/**
 * A label, one form control and its error text. Put the control inside
 * the element. Put a hint, for example a counter, in an element with the
 * appFieldAside attribute.
 */
@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.html',
  host: {
    class: 'flex flex-col gap-2',
  },
})
export class FormField {
  readonly label = input.required<string>();
  readonly controlId = input.required<string>();
  readonly error = input('');

  /** The control refers to the error text with this id. */
  readonly errorId = computed(() => `${this.controlId()}-error`);
}
