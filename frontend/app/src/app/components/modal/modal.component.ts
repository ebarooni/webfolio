import { Component, ElementRef, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  private readonly modalRef = viewChild<ElementRef<HTMLDialogElement>>('modal');
  readonly title = signal('');
  readonly message = signal('');

  showModal(title: string, message: string) {
    this.title.set(title);
    this.message.set(message);
    this.modalRef()?.nativeElement.showModal();
  }
}
