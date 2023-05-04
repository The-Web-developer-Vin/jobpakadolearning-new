import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MyCoursesComponent } from './my-courses.component';
import { SharedModule } from 'src/app/Pages/shared/shared.module';
import { MyCourseVedioComponent } from '../my-course-vedio/my-course-vedio.component';


@NgModule({
  declarations: [MyCoursesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{
      path: "",
      component: MyCoursesComponent

    }]),
  ]
})
export class MyCoursesModule { }
