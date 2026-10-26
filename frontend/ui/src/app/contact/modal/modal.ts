import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal.html',
})
export class Modal {
  private readonly modalRef = viewChild<ElementRef<HTMLDialogElement>>('modal');
  readonly title = signal('');
  readonly message = signal('');

  showModal(title: string, message: string) {
    this.title.set(title);
    this.message.set(message);
    this.modalRef()?.nativeElement.showModal();
  }
}
