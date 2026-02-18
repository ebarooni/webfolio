import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';
import { ShowcaseComponent } from './showcase.component';

describe('ShowcaseComponent', () => {
  it('renders one project card per project', async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(ShowcaseComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    const cards = fixture.debugElement.queryAll(By.css('app-project-item'));
    expect(cards.length).toBe(component.projects.length);
  });
});
