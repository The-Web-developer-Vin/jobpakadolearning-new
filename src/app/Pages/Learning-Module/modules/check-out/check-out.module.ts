import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/Pages/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CheckOutComponent } from './check-out.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CheckOutComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: "",
      component: CheckOutComponent

    }]),
  ]
})
export class CheckOutModule { }
