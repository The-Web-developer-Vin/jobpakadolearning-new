import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SingleCoursesComponent } from './single-courses.component';
import { SharedModule } from 'src/app/Pages/shared/shared.module';



@NgModule({
  declarations: [SingleCoursesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{
      path: "",
      component: SingleCoursesComponent

    }]),
  ]
})
export class SingleCoursesModule { }
