import { Component, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
})
export class PostModalComponent {
  private readonly modal = viewChild<ElementRef<HTMLDialogElement>>('modal');

  public show(): void {
    const dialog = this.modal()?.nativeElement;
    if (!dialog) {
      return;
    }

    dialog.showModal();
  }
}
