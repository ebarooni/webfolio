import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';

import { localizationTestingModule } from '../../../testing/localization-testing';
import { Experience } from './experience';

describe('Experience', () => {
  let fixture: ComponentFixture<Experience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Experience, localizationTestingModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(Experience);
    fixture.detectChanges();
  });

  it('should render every translated entry', () => {
    const titles = fixture.debugElement
      .queryAll(By.css('h3'))
      .map((title) => (title.nativeElement as HTMLElement).textContent.trim());

    expect(titles).toEqual([
      'Full Stack Software Engineer',
      'B.Sc. Industrial Engineering',
      'AI and ML Intern',
      'Student',
    ]);
  });

  it('should be the target of the about link', () => {
    const section = fixture.debugElement.query(By.css('section'))
      .nativeElement as HTMLElement;

    expect(section.id).toBe('experience');
  });
});
