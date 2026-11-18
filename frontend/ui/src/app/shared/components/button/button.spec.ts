import { Component } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';

import { Button } from './button';

@Component({
  imports: [Button],
  template: `
    <a appButton href="/projects">View my work</a>
    <button appButton type="submit">Send</button>
  `,
})
class ButtonHost {}

describe('Button', () => {
  let fixture: ComponentFixture<ButtonHost>;

  function element(selector: string): HTMLElement {
    return fixture.debugElement.query(By.css(selector))
      .nativeElement as HTMLElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonHost);
    fixture.detectChanges();
  });

  it('gives a link the button look and keeps its text', () => {
    expect(element('a').classList).toContain('bg-ink');
    expect(element('a').textContent.trim()).toBe('View my work');
  });

  it('gives a button the same look', () => {
    expect(element('button').classList).toContain('bg-ink');
    expect(element('button').textContent.trim()).toBe('Send');
  });
});
