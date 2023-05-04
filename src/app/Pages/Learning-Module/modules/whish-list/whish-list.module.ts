import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/Pages/shared/shared.module';
import { WhishListComponent } from './whish-list.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [WhishListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: "",
      component: WhishListComponent

    }]),
    SharedModule
  ]
})
export class WhishListModule { }
