import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { ThemeSelectorModal } from './theme-selector-modal';
import { themesArray } from '../../../config/constants/themes-array';

describe('ThemeSelectorModal', () => {
  let component: ThemeSelectorModal;
  let fixture: ComponentFixture<ThemeSelectorModal>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [ThemeSelectorModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeSelectorModal);

    fixture.componentRef.setInput('selectedTheme', themesArray[0]);

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('showModal should open the dialog', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const dialogEl = fixture.nativeElement.querySelector(
      'dialog',
    ) as HTMLDialogElement;

    const showModalSpy = vi
      .spyOn(dialogEl, 'showModal')
      .mockImplementation(() => undefined);

    component.showModal();

    expect(showModalSpy).toHaveBeenCalledTimes(1);
  });
});
