import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AstroToAngular } from './astro-to-angular';

describe('AstroToAngular', () => {
  let component: AstroToAngular;
  let fixture: ComponentFixture<AstroToAngular>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [AstroToAngular],
    }).compileComponents();

    fixture = TestBed.createComponent(AstroToAngular);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
