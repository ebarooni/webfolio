import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { About } from './about';

describe('About', () => {
  let fixture: ComponentFixture<About>;
  let component: About;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(About);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('renders the main heading', () => {
    const headingDebug = fixture.debugElement.query(By.css('h1'));
    const heading = headingDebug.nativeElement as HTMLHeadingElement;

    expect(heading.textContent?.trim()).toBe('Ehsan Barooni');
  });

  it('renders the primary action buttons', () => {
    const links = fixture.debugElement.queryAll(By.css('a'));
    expect(links.length).toBe(2);
  });
});
