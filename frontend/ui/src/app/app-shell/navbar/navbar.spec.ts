import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Navbar } from './navbar';
import type { Theme } from '../../config/constants/themes-array';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';

describe('Navbar', () => {
  let fixture: ComponentFixture<Navbar>;
  let component: Navbar;

  const create = async (opts?: {
    selectedTheme?: Theme;
    version?: string | undefined;
  }) => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideLocationMocks(),
      ],
      imports: [Navbar],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;

    fixture.componentRef.setInput(
      'selectedTheme',
      (opts?.selectedTheme ?? ('light' as Theme)) as Theme,
    );

    fixture.componentRef.setInput('version', opts?.version);

    fixture.detectChanges();
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', async () => {
    await create();
    expect(component).toBeTruthy();
  });

  it('should throw if required selectedTheme input is not provided', async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
    }).compileComponents();

    const f = TestBed.createComponent(Navbar);

    expect(() => f.detectChanges()).toThrow();
  });

  describe('theme menu state', () => {
    it('toggleThemeMenu should toggle open state', async () => {
      await create();

      expect(component.isThemeMenuOpen()).toBe(false);

      component.toggleThemeMenu();
      expect(component.isThemeMenuOpen()).toBe(true);

      component.toggleThemeMenu();
      expect(component.isThemeMenuOpen()).toBe(false);
    });

    it('closeThemeMenu should close', async () => {
      await create();

      component.isThemeMenuOpen.set(true);
      component.closeThemeMenu();

      expect(component.isThemeMenuOpen()).toBe(false);
    });

    it('selectTheme should emit themeChanged and close the menu', async () => {
      await create({ selectedTheme: 'light' as Theme });

      const emitSpy = vi.spyOn(component.themeChanged, 'emit');

      component.isThemeMenuOpen.set(true);
      component.selectTheme('dark' as Theme);

      expect(emitSpy).toHaveBeenCalledTimes(1);
      expect(emitSpy).toHaveBeenCalledWith('dark');
      expect(component.isThemeMenuOpen()).toBe(false);
    });
  });

  describe('outside click behavior (pointerdown)', () => {
    it('should close when clicking outside dropdown while open', async () => {
      await create();

      component.isThemeMenuOpen.set(true);

      const dropdownEl = document.createElement('div');
      dropdownEl.innerHTML = `<button id="inside"></button>`;
      document.body.appendChild(dropdownEl);

      vi.spyOn(component, 'themeDropdown').mockReturnValue({
        nativeElement: dropdownEl,
      } as any);

      const outside = document.createElement('div');
      document.body.appendChild(outside);

      outside.dispatchEvent(
        new PointerEvent('pointerdown', { bubbles: true }),
      );

      expect(component.isThemeMenuOpen()).toBe(false);

      dropdownEl.remove();
      outside.remove();
    });

    it('should NOT close when clicking inside dropdown while open', async () => {
      await create();

      component.isThemeMenuOpen.set(true);

      const dropdownEl = document.createElement('div');
      dropdownEl.innerHTML = `<button id="inside"></button>`;
      document.body.appendChild(dropdownEl);

      const insideBtn = dropdownEl.querySelector('#inside') as HTMLElement;

      vi.spyOn(component, 'themeDropdown').mockReturnValue({
        nativeElement: dropdownEl,
      } as any);

      insideBtn.dispatchEvent(
        new PointerEvent('pointerdown', { bubbles: true }),
      );

      expect(component.isThemeMenuOpen()).toBe(true);

      dropdownEl.remove();
    });

    it('should do nothing if dropdown element is missing', async () => {
      await create();

      component.isThemeMenuOpen.set(true);

      vi.spyOn(component, 'themeDropdown').mockReturnValue(
        undefined as any,
      );

      document.body.dispatchEvent(
        new PointerEvent('pointerdown', { bubbles: true }),
      );

      expect(component.isThemeMenuOpen()).toBe(true);
    });
  });

  describe('scroll shadow behavior', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should toggle shadow-xs on navbarDiv when scrolling', async () => {
      await create();

      const host = document.createElement('div');
      document.body.appendChild(host);

      vi.spyOn(component, 'navbarDiv').mockReturnValue({
        nativeElement: host,
      } as any);

      vi.spyOn(window, 'scrollY', 'get').mockReturnValue(10);
      window.dispatchEvent(new Event('scroll'));

      vi.advanceTimersByTime(60);
      expect(host.classList.contains('shadow-xs')).toBe(true);

      vi.spyOn(window, 'scrollY', 'get').mockReturnValue(0);
      window.dispatchEvent(new Event('scroll'));

      vi.advanceTimersByTime(60);
      expect(host.classList.contains('shadow-xs')).toBe(false);

      host.remove();
    });
  });
});
