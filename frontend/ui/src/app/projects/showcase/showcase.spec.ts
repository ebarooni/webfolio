import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';
import { Showcase } from './showcase';

describe('Showcase', () => {
  it('renders one project card per project', async () => {
    await TestBed.configureTestingModule({
      imports: [Showcase],
    }).compileComponents();

    const fixture = TestBed.createComponent(Showcase);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    const cards = fixture.debugElement.queryAll(By.css('app-project-item'));
    expect(cards.length).toBe(component.projects.length);
  });
});
