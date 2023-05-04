import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SingleViewCourseComponent } from './single-view-course.component';
import { SharedModule } from 'src/app/Pages/shared/shared.module';


@NgModule({
  declarations: [SingleViewCourseComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{
      path: "",
      component: SingleViewCourseComponent

    }]),
  ]
})
export class SingleViewCourseModule { }
