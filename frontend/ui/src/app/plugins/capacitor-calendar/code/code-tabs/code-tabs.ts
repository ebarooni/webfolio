import { Component, computed, input, signal } from '@angular/core';

import { CodeBlock } from '../code-block/code-block';
import { type CodeLanguage } from '../highlight';

export type CodeTab = Readonly<{
  id: string;
  title: string;
  label: string;
  code: string;
  language: CodeLanguage;
}>;

/** Code samples for the same step, one tab for each variant. */
@Component({
  selector: 'app-code-tabs',
  imports: [CodeBlock],
  templateUrl: './code-tabs.html',
  styleUrl: './code-tabs.css',
})
export class CodeTabs {
  readonly tabs = input.required<readonly CodeTab[]>();
  readonly name = input.required<string>();

  readonly selectedIndex = signal(0);
  readonly selected = computed(() => this.tabs()[this.selectedIndex()]);

  select(index: number): void {
    this.selectedIndex.set(index);
  }

  // The arrow keys move between the tabs, as in a native tab list.
  moveFocus(event: KeyboardEvent, tabList: HTMLElement): void {
    const count = this.tabs().length;
    let next = this.selectedIndex();

    if (event.key === 'ArrowRight') {
      next = (next + 1) % count;
    } else if (event.key === 'ArrowLeft') {
      next = (next - 1 + count) % count;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = count - 1;
    } else {
      return;
    }

    event.preventDefault();
    this.select(next);
    tabList.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  }
}
