import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScrollIndicatorComponent } from './scroll-indicator.component';

describe('ScrollIndicatorComponent', () => {
  let component: ScrollIndicatorComponent;
  let fixture: ComponentFixture<ScrollIndicatorComponent>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [ScrollIndicatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
