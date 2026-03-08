import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PostModal } from './post-modal';

describe('PostModal', () => {
  let fixture: ComponentFixture<PostModal>;
  let component: PostModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostModal],
    }).compileComponents();

    fixture = TestBed.createComponent(PostModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calls showModal when show() is invoked', () => {
    const dialogDebug = fixture.debugElement.query(By.css('dialog'));
    const dialog = dialogDebug.nativeElement as HTMLDialogElement;

    Object.defineProperty(dialog, 'showModal', {
      value: vi.fn(),
      configurable: true,
      writable: true,
    });

    const spy = vi.spyOn(dialog, 'showModal');

    component.show();

    expect(spy).toHaveBeenCalledOnce();
  });

  it('calls close when close() is invoked', () => {
    const dialogDebug = fixture.debugElement.query(By.css('dialog'));
    const dialog = dialogDebug.nativeElement as HTMLDialogElement;

    Object.defineProperty(dialog, 'close', {
      value: vi.fn(),
      configurable: true,
      writable: true,
    });

    const spy = vi.spyOn(dialog, 'close');

    component.close();

    expect(spy).toHaveBeenCalledOnce();
  });

  it('renders the close button', () => {
    const buttonDebug = fixture.debugElement.query(
      By.css('button[type="submit"]'),
    );
    const button = buttonDebug.nativeElement as HTMLButtonElement;

    expect(button.textContent?.trim()).toBe('Close');
  });
});
