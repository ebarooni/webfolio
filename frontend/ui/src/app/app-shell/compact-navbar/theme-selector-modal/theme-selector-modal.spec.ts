import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { ThemeSelectorModal } from './theme-selector-modal';
import { themesArray } from '../../../config/themes-array';

describe('ThemeSelectorModal', () => {
  let fixture: ComponentFixture<ThemeSelectorModal>;
  let component: ThemeSelectorModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeSelectorModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeSelectorModal);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('selectedTheme', themesArray[0]);
    fixture.detectChanges();

    const dialogDebug = fixture.debugElement.query(By.css('dialog'));
    const dialog = dialogDebug.nativeElement as HTMLDialogElement;

    Object.defineProperty(dialog, 'showModal', {
      value: vi.fn(),
      configurable: true,
    });
    Object.defineProperty(dialog, 'close', {
      value: vi.fn(),
      configurable: true,
    });
  });

  it('should render all themes', () => {
    const buttons = fixture.debugElement.queryAll(By.css('ul li button'));
    expect(buttons.length).toBe(themesArray.length);
  });

  it('should emit selected theme and close modal', () => {
    const emitSpy = vi.spyOn(component.themeChanged, 'emit');
    const closeSpy = vi.spyOn(component, 'closeModal');

    const buttons = fixture.debugElement.queryAll(By.css('ul li button'));
    const buttonDebug = buttons[1];
    const button = buttonDebug.nativeElement as HTMLButtonElement;

    button.click();

    expect(emitSpy).toHaveBeenCalledWith(themesArray[1]);
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should open modal when showModal is called', () => {
    const dialogDebug = fixture.debugElement.query(By.css('dialog'));
    const dialog = dialogDebug.nativeElement as HTMLDialogElement;

    const showModalSpy = vi
      .spyOn(dialog, 'showModal')
      .mockImplementation(() => void 0);

    Object.defineProperty(dialog, 'open', { value: false, configurable: true });

    component.showModal();

    expect(showModalSpy).toHaveBeenCalled();
  });

  it('should close modal when closeModal is called', () => {
    const dialogDebug = fixture.debugElement.query(By.css('dialog'));
    const dialog = dialogDebug.nativeElement as HTMLDialogElement;

    const closeSpy = vi.spyOn(dialog, 'close').mockImplementation(() => void 0);

    Object.defineProperty(dialog, 'open', { value: true, configurable: true });

    component.closeModal();

    expect(closeSpy).toHaveBeenCalled();
  });

  it('should mark selected theme as pressed', () => {
    fixture.componentRef.setInput('selectedTheme', themesArray[0]);
    fixture.detectChanges();

    const buttonDebug = fixture.debugElement.query(By.css('ul li button'));
    const button = buttonDebug.nativeElement as HTMLButtonElement;

    expect(button.getAttribute('aria-pressed')).toBe('true');
  });
});
