import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCourseVedioComponent } from './my-course-vedio.component';

describe('MyCourseVedioComponent', () => {
  let component: MyCourseVedioComponent;
  let fixture: ComponentFixture<MyCourseVedioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCourseVedioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCourseVedioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
