import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartComponent } from './cart.component';
import { SharedModule } from 'src/app/Pages/shared/shared.module';



@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{
      path: "",
      component: CartComponent

    }]),
  ]
})
export class CartModule { }
