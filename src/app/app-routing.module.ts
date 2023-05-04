import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/Learning-Module/modules/home/home.component';
import { SingleViewCourseModule } from './Pages/Learning-Module/modules/single-view-course/single-view-course/single-view-course.module';
import { MyCoursesComponent } from './Pages/Learning-Module/modules/my-courses/my-courses.component';
import { Route } from '@angular/router';
// import { HomeComponent } from './Pages/Learning-Module/home/home.component';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('../app/Pages/Learning-Module/modules/home/home.module').then(m => m.HomeModule)
  },


  {
    path: 'my-courses',
    loadChildren: () => import('../app/Pages/Learning-Module/modules/my-courses/my-courses.module').then(m => m.MyCoursesModule)
  },
  {
    path: 'single-viewCourse/:id',
    loadChildren: () => import('../app/Pages/Learning-Module/modules/single-view-course/single-view-course/single-view-course.module').then(m => m.SingleViewCourseModule)
  },
  {
    path: 'single-courses/:id',
    loadChildren: () => import('../app/Pages/Learning-Module/modules/single-courses/single-courses.module').then(m => m.SingleCoursesModule)
  },
   {
    path: 'cart',
    loadChildren: () => import('../app/Pages/Learning-Module/modules/cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'check-out',
    loadChildren: () => import('../app/Pages/Learning-Module/modules/check-out/check-out.module').then(m => m.CheckOutModule)
  },
  {
    path: 'myCourse-video/:id',
    loadChildren: () => import('../app/Pages/Learning-Module/modules/my-course-vedio/my-course-vedio.module').then(m => m.MyCourseVedioModule)
  },
  {
    path: 'wishlist',
    loadChildren: () => import('../app/Pages/Learning-Module/modules/whish-list/whish-list.module').then(m => m.WhishListModule)
  },

];

@NgModule({
  imports:[
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 135],
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
