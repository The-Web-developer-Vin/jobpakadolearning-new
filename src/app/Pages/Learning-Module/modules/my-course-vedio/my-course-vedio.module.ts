import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCoursesComponent } from '../my-courses/my-courses.component';
import { SharedModule } from 'src/app/Pages/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MyCourseVedioComponent } from './my-course-vedio.component';



@NgModule({
  declarations: [MyCourseVedioComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{
      path: "",
      component: MyCourseVedioComponent

    }]),
  ]
})
export class MyCourseVedioModule { }
