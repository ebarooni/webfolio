import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScrollIndicator } from './scroll-indicator';

describe('ScrollIndicator', () => {
  let component: ScrollIndicator;
  let fixture: ComponentFixture<ScrollIndicator>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [ScrollIndicator],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollIndicator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
