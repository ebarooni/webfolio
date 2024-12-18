import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BaseLayoutComponent } from './base-layout.component';
import { appConfig } from '../../app.config';

describe('BaseLayoutComponent', () => {
  let component: BaseLayoutComponent;
  let fixture: ComponentFixture<BaseLayoutComponent>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        imports: [BaseLayoutComponent],
      }),
    ).compileComponents();

    fixture = TestBed.createComponent(BaseLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
