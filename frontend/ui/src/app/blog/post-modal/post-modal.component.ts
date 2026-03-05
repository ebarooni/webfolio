import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostModalComponent {
  private readonly modal = viewChild<ElementRef<HTMLDialogElement>>('modal');

  show(): void {
    const dialog = this.modal()?.nativeElement;
    if (!dialog) {
      return;
    }

    dialog.showModal();
  }

  close(): void {
    const dialog = this.modal()?.nativeElement;
    if (!dialog) {
      return;
    }

    dialog.close();
  }
}
