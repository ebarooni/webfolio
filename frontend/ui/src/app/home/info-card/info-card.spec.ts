import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InfoCard } from './info-card';

describe('InfoCard', () => {
  let component: InfoCard;
  let fixture: ComponentFixture<InfoCard>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [InfoCard],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
