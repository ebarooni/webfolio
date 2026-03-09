import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { Modal } from './modal';

describe('Modal', () => {
  let fixture: ComponentFixture<Modal>;
  let component: Modal;
  let originalShowModal: PropertyDescriptor | undefined;

  beforeAll(() => {
    originalShowModal = Object.getOwnPropertyDescriptor(
      HTMLDialogElement.prototype,
      'showModal',
    );

    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
      configurable: true,
      value() {
        void 0;
      },
      writable: true,
    });
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modal],
    }).compileComponents();

    fixture = TestBed.createComponent(Modal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(() => {
    if (originalShowModal) {
      Object.defineProperty(
        HTMLDialogElement.prototype,
        'showModal',
        originalShowModal,
      );
      return;
    }

    delete (HTMLDialogElement.prototype as Partial<HTMLDialogElement>)
      .showModal;
  });

  it('updates the title and message and opens the dialog', () => {
    const dialogDebugElement = fixture.debugElement.query(By.css('dialog'));
    const dialogElement = dialogDebugElement.nativeElement as HTMLDialogElement;
    const showModalSpy = vi.spyOn(dialogElement, 'showModal');

    component.showModal('Message sent ✅', 'Thanks for reaching out.');

    expect(component.title()).toBe('Message sent ✅');
    expect(component.message()).toBe('Thanks for reaching out.');
    expect(showModalSpy).toHaveBeenCalledTimes(1);
  });

  it('renders the current title and message in the template', () => {
    component.showModal('Error ⚠️', 'Submissions are currently disabled.');
    fixture.detectChanges();

    const titleDebugElement = fixture.debugElement.query(By.css('h3'));
    const messageDebugElement = fixture.debugElement.query(By.css('p'));
    const titleElement = titleDebugElement.nativeElement as HTMLHeadingElement;
    const messageElement =
      messageDebugElement.nativeElement as HTMLParagraphElement;

    expect(titleElement.textContent?.trim()).toBe('Error ⚠️');
    expect(messageElement.textContent?.trim()).toBe(
      'Submissions are currently disabled.',
    );
  });
});
