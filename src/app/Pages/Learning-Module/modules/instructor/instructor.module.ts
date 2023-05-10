import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorComponent } from './instructor.component';
import { SharedModule } from 'src/app/Pages/shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    InstructorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{
      path:"",
      component:InstructorComponent
    }])
  ]
})
export class InstructorModule { }
