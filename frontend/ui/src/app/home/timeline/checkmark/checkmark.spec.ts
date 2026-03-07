import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Checkmark } from './checkmark';

describe('Checkmark', () => {
  let component: Checkmark;
  let fixture: ComponentFixture<Checkmark>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [Checkmark],
    }).compileComponents();

    fixture = TestBed.createComponent(Checkmark);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
