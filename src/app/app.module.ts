import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/Learning-Module/modules/home/home.component';
import { FooterComponent } from './Pages/shared/footer/footer.component';
import { HeaderComponent } from './Pages/shared/header/header.component';
// import { SingleViewCourseComponent } from './Pages/Learning-Module/modules/single-view-course/single-view-course/single-view-course.module';

//  import { CarouselModule } from 'ngx-owl-carousel-o';
// import {IvyCarouselModule} from 'carousel-angular';
import {IvyCarouselModule} from 'angular-responsive-carousel';

import { Modal } from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'
import { CommonModule } from '@angular/common';

import { ModalDialogModule } from 'ngx-modal-dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyCoursesComponent } from './Pages/Learning-Module/modules/my-courses/my-courses.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SingleCoursesComponent } from './Pages/Learning-Module/modules/single-courses/single-courses.component';
import { DayAgoPipe } from './Pages/shared/day-ago-pipe';
import {RatingModule} from "ngx-rating";
import { CartComponent } from './Pages/Learning-Module/modules/cart/cart.component';
import { CheckOutComponent } from './Pages/Learning-Module/modules/check-out/check-out.component';

import { MyCourseVedioComponent } from './Pages/Learning-Module/modules/my-course-vedio/my-course-vedio.component';

@NgModule({
  declarations: [
    // CommonModule,
    AppComponent,
    
    // MyCourseVedioComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IvyCarouselModule,
    ModalDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    // Modal
    // ModalOptions,
    // ModalInterface

    
  ],
  exports:[
    BrowserAnimationsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
