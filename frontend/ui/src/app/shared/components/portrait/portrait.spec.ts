import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';

import { Portrait } from './portrait';

describe('Portrait', () => {
  let fixture: ComponentFixture<Portrait>;

  function image(): HTMLImageElement {
    return fixture.debugElement.query(By.css('img'))
      .nativeElement as HTMLImageElement;
  }

  async function createPortrait(isPriority: boolean): Promise<void> {
    await TestBed.configureTestingModule({
      imports: [Portrait],
    }).compileComponents();

    fixture = TestBed.createComponent(Portrait);
    fixture.componentRef.setInput('alt', 'Portrait');
    fixture.componentRef.setInput('isPriority', isPriority);
    fixture.detectChanges();
  }

  it.each([
    { isPriority: false, loading: 'lazy', fetchPriority: 'auto' },
    { isPriority: true, loading: 'eager', fetchPriority: 'high' },
  ])(
    'should load the photo $loading when the priority is $isPriority',
    async ({ isPriority, loading, fetchPriority }) => {
      await createPortrait(isPriority);

      expect(image().getAttribute('src')).toBe('profile.webp');
      expect(image().alt).toBe('Portrait');
      expect(image().getAttribute('loading')).toBe(loading);
      expect(image().getAttribute('fetchpriority')).toBe(fetchPriority);
    },
  );

  it('should show the initials when the photo fails to load', async () => {
    await createPortrait(false);

    fixture.debugElement.query(By.css('img')).triggerEventHandler('error');
    fixture.detectChanges();

    const fallback = fixture.debugElement.query(By.css('[role="img"]'))
      .nativeElement as HTMLElement;

    expect(fixture.debugElement.query(By.css('img'))).toBeNull();
    expect(fallback.textContent.trim()).toBe('EB');
    expect(fallback.getAttribute('aria-label')).toBe('Portrait');
  });
});
