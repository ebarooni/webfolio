import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { XingComponent } from './xing.component';

describe('XingComponent', () => {
  let component: XingComponent;
  let fixture: ComponentFixture<XingComponent>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [XingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(XingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
