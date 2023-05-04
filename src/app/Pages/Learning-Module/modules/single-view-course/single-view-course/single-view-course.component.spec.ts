import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleViewCourseComponent } from './single-view-course.component';

describe('SingleViewCourseComponent', () => {
  let component: SingleViewCourseComponent;
  let fixture: ComponentFixture<SingleViewCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleViewCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleViewCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
