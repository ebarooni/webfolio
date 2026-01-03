import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CheckmarkComponent } from './checkmark.component';

describe('CheckmarkComponent', () => {
  let component: CheckmarkComponent;
  let fixture: ComponentFixture<CheckmarkComponent>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [CheckmarkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
