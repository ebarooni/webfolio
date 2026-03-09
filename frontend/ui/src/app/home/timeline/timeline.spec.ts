import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Timeline } from './timeline';

describe('Timeline', () => {
  let fixture: ComponentFixture<Timeline>;
  let component: Timeline;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Timeline],
    }).compileComponents();

    fixture = TestBed.createComponent(Timeline);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('renders the timeline title', () => {
    const titleDebug = fixture.debugElement.query(By.css('h2'));
    const title = titleDebug.nativeElement as HTMLHeadingElement;

    expect(title.textContent?.trim()).toBe('Timeline');
  });

  it('renders all timeline items', () => {
    const items = fixture.debugElement.queryAll(By.css('li'));
    expect(items.length).toBe(component.items.length);
  });

  it('renders titles for timeline items', () => {
    const titles = fixture.debugElement.queryAll(By.css('h3'));
    expect(titles.length).toBe(component.items.length);
  });
});
