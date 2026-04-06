import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BlogComponent } from './blog';
import { DatePipe } from '@angular/common';
import { PostModal } from './post-modal/post-modal';

@Component({
  selector: 'app-hero',
  template: '<ng-content></ng-content>',
  standalone: true,
})
class MockHero {
  backgroundClass = input<string>();
  subtitleClass = input<string>();
}

@Component({
  selector: 'app-post-modal',
  template: '<ng-content></ng-content>',
  standalone: true,
})
class MockPostModal {
  show(): void {
    return void 0;
  }
}

@Component({
  selector: 'app-astro-to-angular',
  template: '',
  standalone: true,
})
class MockAstroToAngular {}

@Component({
  selector: 'app-vps-hosting',
  template: '',
  standalone: true,
})
class MockVpsHosting {}

describe('BlogComponent', () => {
  let fixture: ComponentFixture<BlogComponent>;
  let component: BlogComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BlogComponent,
        DatePipe,
        MockHero,
        MockPostModal,
        MockAstroToAngular,
        MockVpsHosting,
      ],
    })
      .overrideComponent(BlogComponent, {
        set: {
          imports: [
            DatePipe,
            MockHero,
            MockPostModal,
            MockAstroToAngular,
            MockVpsHosting,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders all blog posts', () => {
    const articles = fixture.debugElement.queryAll(By.css('article'));
    expect(articles.length).toBe(component.posts.length);
  });

  it('renders post title and summary', () => {
    const titleEl = fixture.debugElement.query(By.css('h2'));
    const summaryEl = fixture.debugElement.query(By.css('article p'));

    const title = titleEl.nativeElement as HTMLHeadingElement;
    const summary = summaryEl.nativeElement as HTMLParagraphElement;

    expect(title.textContent).toContain(component.posts[0].title);
    expect(summary.textContent).toContain(component.posts[0].summary);
  });

  it('renders read time', () => {
    const spanEl = fixture.debugElement.query(By.css('article span'));
    const span = spanEl.nativeElement as HTMLSpanElement;

    expect(span.textContent).toContain(
      `${component.posts[0].readTime} min read`,
    );
  });

  it('calls show on modal and updates selectedPostId when clicking read more', () => {
    const modalDebug = fixture.debugElement.query(By.directive(MockPostModal));
    const modal = modalDebug.componentInstance as MockPostModal;

    const spy = vi.spyOn(modal, 'show');

    const buttonDebug = fixture.debugElement.query(By.css('button'));
    const button = buttonDebug.nativeElement as HTMLButtonElement;

    button.click();
    fixture.detectChanges();

    expect(component.selectedPostId()).toBe(component.posts[0].id);
    expect(spy).toHaveBeenCalled();
  });

  it('viewPost updates selectedPostId and opens modal', () => {
    const modalDebug = fixture.debugElement.query(By.directive(MockPostModal));
    const modal = modalDebug.componentInstance as PostModal;

    const spy = vi.spyOn(modal, 'show');

    component.viewPost(component.posts[0].id, modal);

    expect(component.selectedPostId()).toBe(component.posts[0].id);
    expect(spy).toHaveBeenCalled();
  });
});
