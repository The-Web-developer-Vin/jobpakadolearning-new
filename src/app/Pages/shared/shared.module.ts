import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule,DomSanitizer } from '@angular/platform-browser';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { DayAgoPipe } from './day-ago-pipe';
import { RouterModule } from '@angular/router';
// import {RatingModule} from "ngx-rating";


@NgModule({
  declarations: [ 
    FooterComponent,
    HeaderComponent,
    DayAgoPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalDialogModule,
    IvyCarouselModule,
    ToastrModule,
    RouterModule
    // DomSanitizer,


    // RatingModule,
    // MatSnackBarModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    DayAgoPipe,
    FormsModule,
    ReactiveFormsModule,
    ModalDialogModule,
    IvyCarouselModule,
    ToastrModule,
  ]
})
export class SharedModule { }
