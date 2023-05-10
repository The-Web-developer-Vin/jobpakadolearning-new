import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { applicationUrls } from '../../url'; 
import { Subject,Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class courseService {
  token: any;
  isUser = new Subject()
  sharedData: Subject<any> = new Subject<any>();
  sharedData$: Observable<any> = this.sharedData.asObservable();
  deletecartlength:Subject<any> = new Subject<any>();
  deletecartlength$: Observable<any> = this.deletecartlength.asObservable();
  cartData: Subject<any> = new Subject<any>();
  cartData$: Observable<any> = this.sharedData.asObservable();
  isCartCount= new Subject<any>();
  isCartCount$: Observable<any> = this.isCartCount.asObservable();
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  wishListCount: Subject<any> = new Subject<any>();
  wishListCount$: Observable<any> = this.wishListCount.asObservable();
  loginModal: Subject<any> = new Subject<any>();
  loginModal$: Observable<any> = this.loginModal.asObservable();

  constructor(private http: HttpClient,private _httpClient: HttpClient,) {
    let data = JSON.parse(localStorage.getItem('USERTOKEN')!);
    this.token = data;

   }
  sendTheSms(data: any) {
    let options={
      headers: new HttpHeaders({
      Authorization: "Bearer " + this.token,
      accept:"application/json",
    }),
  }
    return this.http.post(applicationUrls.sendSms, data,options);
  }
  verifyTheSms(data: any) {
    let options={
      headers: new HttpHeaders({
      Authorization: "Bearer " + this.token,
      accept:"application/json",
    }),
  }
    return this.http.post(applicationUrls.verifyOtp, data,options);
  }

  loginprofile(data: any) {
    let options={
      headers: new HttpHeaders({
      Authorization: "Bearer " + this.token,
      accept:"application/json",
    }),
  }
    return this.http.post(applicationUrls.userDetails, data,options);
  }
  getAllCourses(){
    let options={
      headers: new HttpHeaders({
      Authorization: "Bearer " + this.token,
      accept:"application/json",
    }),
  }
    return this.http.get(applicationUrls.coursesData,options)
  }
  getAllCoursesData(params: any){
    let options={
      headers: new HttpHeaders({
      Authorization: "Bearer " + this.token,
      accept:"application/json",
    }),
  }
    return this.http.get(applicationUrls.courses + params,options)
  }
  getAllSingleViewCourse(body:any){
    let options={
      headers: new HttpHeaders({
      Authorization: "Bearer " + this.token,
      accept:"application/json",
    }),
  }
    return this.http.get(applicationUrls.singleViewCourseData + '/' + body,options)
  }
  getRatingsData(params:any){
    let options={
      headers: new HttpHeaders({
      Authorization: "Bearer " + this.token,
      accept:"application/json",
    }),
  }
    return this.http.get(applicationUrls.ratingsData + params,options)
  }

  setData(updatedData:any) {
    this.messageSource.next(updatedData);
  }
  createCratData(body:any){
    let options={
      headers: new HttpHeaders({
      Authorization: "Bearer " + this.token,
      accept:"application/json",
    }),
  }
    return this.http.post(applicationUrls.createCart, body,options)
  }
  cartGetById(params:any){
    let options={
      headers: new HttpHeaders({
      Authorization: "Bearer " + this.token,
      accept:"application/json",
    }),
  }
    return this.http.get(applicationUrls.cartGetById + params,options)
  }
deleteCart(params:any){
  let options={
    headers: new HttpHeaders({
    Authorization: "Bearer " + this.token,
    accept:"application/json",
  }),
}
  return this.http.delete(applicationUrls.deleteCartData + params,options)
}
categorieGetById(params:any){
  let options={
    headers: new HttpHeaders({
    Authorization: "Bearer " + this.token,
    accept:"application/json",
  }),
}
  return this.http.get(applicationUrls.courseGertByIdCategporie + params,options)
}
getCourseList(){
  let options={
    headers: new HttpHeaders({
    Authorization: "Bearer " + this.token,
    accept:"application/json",
  }),
}
  return this.http.get(applicationUrls.courseList,options)
}
getMyCourseByUserId(){
  let options={
    headers: new HttpHeaders({
    Authorization: "Bearer " + this.token,
    accept:"application/json",
  }),
}
  return this.http.get(applicationUrls.myCourseByUserId,options)
}

getCouponData(body:any){
  let options={
    headers: new HttpHeaders({
    Authorization: "Bearer " + this.token,
    accept:"application/json",
  }),
}
  return this.http.post(applicationUrls.couponData,body,options)
}
creatWishlist(body: any) {
  let options={
    headers: new HttpHeaders({
    Authorization: "Bearer " + this.token,
    accept:"application/json",
  }),
}
  return this.http.post(
    applicationUrls.wishList + 'create_update_wishlist',
    body,options
  );
}
getAllWishlist(id: any) {
  let options={
    headers: new HttpHeaders({
    Authorization: "Bearer " + this.token,
    accept:"application/json",
  }),
}
  return this.http.get(applicationUrls.wishList + 'get_wishlist_by_id/' + id,options);
}
removeWishlist(id: any) {
  let options={
    headers: new HttpHeaders({
    Authorization: "Bearer " + this.token,
    accept:"application/json",
  }),
}
  return this.http.delete(
    applicationUrls.wishList + 'delete_wishlist_by_id/' + id,options
  );
}
getCreateUserData(params:any){
  let options={
    headers: new HttpHeaders({
    Authorization: "Bearer " + this.token,
    accept:"application/json",
  }),
}
  return this.http.get(applicationUrls.createUserData + params,options)
}
getCreateUpdatedUser(body:any){
  let options={
    headers:new HttpHeaders({
      Authorization: "Bearer " + this.token,
      accept:"application/json",
    })
  }
  return this.http.post(applicationUrls.createUpdateUser,body,options)
}

commonUpload(body:any){
  let options={
    headers:new HttpHeaders({
      Authorization: "Bearer " + this.token,
      accept:"application/json",
    })
  }
  return this.http.post(applicationUrls.upload,body,options)
}


}
