import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BlogComponent } from './blog';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [BlogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
