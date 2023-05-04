import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
@Injectable({
    providedIn: "root",
  })
  export class jobpakadoUrl {
    url = environment.apiUrl + environment.apiVersion;

    get sendSms() {
        return this.url + "/user/send_sms";
      }
      get verifyOtp() {
        return this.url + "/user/verify_sms";
      }
      get userDetails() {
        return this.url + '/user/userDetails';
      }
      get coursesData(){
        return this.url + '/category/category/List';
      }
      get singleViewCourseData(){
         return this.url + '/course/course_get';
      }
      get courses(){
        return this.url + '/course/getAll';
      }
      get ratingsData(){
        return this.url + '/rating/rating/';
      }
      get createCart(){
        return this.url + '/cart/create-update-cart';
      }
      get cartGetById(){
        return this.url + '/cart/getcartById/';
      }
      get deleteCartData(){
        return this.url + '/cart/deleteCartItem/';
      }
     get courseGertByIdCategporie(){
      return this.url + '/course/get_course_by_category/'
     }
     get courseList(){
      return this.url + '/course/list'
     }
     get myCourseByUserId(){
      return this.url + '/course/getMyCoursesByUserId'
     }
     get couponData(){
      return this.url + '/coupon/applyCoupon'
     }
     get wishList(){
      return this.url + '/wishList/'
     }
  }

  export const applicationUrls = new jobpakadoUrl();