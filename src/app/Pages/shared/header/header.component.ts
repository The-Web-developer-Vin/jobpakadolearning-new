import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subject, filter } from 'rxjs';
import { courseService } from '../services/courses/courses.service';
// import { CoursesService } from 'src/app/shared/services/courses/courses.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  signInForm!: FormGroup;
  admitForm!: FormGroup;
  disable = false;
  submitted = false;
  submits = false;
  verifyOTP: boolean = false;
  numbeResponse: any;
  verfyOtpForm!: FormGroup;
  code: any;
  userDetails: any;
  verifytoken: any;
  userId: any;
  enterdetails: boolean = false;
  timerInterval: any;
  displayedtime: any;
  resendOtp: boolean = false;
  userToken: any;
  admitCardDetails: boolean = false;
  userData: any;
  isError: boolean = false;
  isCities: boolean = false;
  cities: any = [];
  currentRouteUrl: any;
  logins: boolean = false;
  profileDetails: any;
  isShow: boolean = false;
  userInfo: any;
  sharedData: any;
  id: any;
  count: any;
  // subject$ = new Subject();
  localData: any;
  subject = new Subject<number>();
  cartCount: any;
  cartData: any = 0;

  cartAllData: any;
  cart:any
  cartCountsssssss: any;
  productsCount: any;
  cartLength: any;
  cartId: any;
  usersId: any;
  UserID: any;
  cartDatas: any;
  deletyeLength: any;
  totalPrice: any;
  deleteCartId: any;
  wishlistData:any=0
  constructor(
    private fb: FormBuilder,
    private courseservice: courseService,
    private router: Router,
    // private snackBar: MatSnackBar,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private courseService: courseService
  ) {
    this.productsCount=JSON.parse(localStorage.getItem('products')!);
    this.cartDatas=this.productsCount
    if(this.productsCount){
    this.cartCount=this.productsCount?.length
    }
 console.log("this.cartCount",this.cartCount)
    this.userData = JSON.parse(localStorage.getItem('USERDATA')!);
    this.UserID=this.userData?._id
    console.log("this.UserID",this.UserID)
    if (this.userData) {
      this.userInfo = this.userData.data ? this.userData.data : this.userData;
      this.logins = true;
    }
    console.log('userData==>', this.userInfo);

    this.courseService.isCartCount.subscribe((res) => {
      // alert('here');
      this.cart = res;
       console.log('this.cart', this.cart);
  });
  if(this.userData){
    this.addtocart()
  }

  }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      mobile_number: ['', [Validators.required, Validators.minLength(10)]],
    });
    this.verfyOtpForm = this.fb.group({
      code: ['', [Validators.required]],
    });
    this.admitForm = this.fb.group({
      fullName: ['', [Validators.required]],
      gmail: ['', [Validators.required, Validators.email]],
      city: ['', [Validators.required]],
      role: ['', [Validators.required]],
      reminders: [true],
    });
    this.verfyOtpForm.statusChanges
      .pipe(
        filter((status: string) => {
          console.log(status);
          if (status == 'VALID') {
            this.submits = false;
          }
          return this.verfyOtpForm.valid;
        })
      )
      .subscribe(() => this.onFormValid());
    const target: any = document.querySelector('#dropdownLeftEnd');
    document.addEventListener('click', (event) => {
      const withinBoundaries = event.composedPath().includes(target);
      if (withinBoundaries) {
        this.isCities = true;
      } else {
        this.isCities = false;
      }
    });
    this.route.queryParams.subscribe((res: any) => {
      this.currentRouteUrl = res.redirectURL;
    });

    let sharedData: any = JSON.parse(localStorage.getItem('products')!);
    console.log('sharedData', sharedData);
    this.count = sharedData;

    let userDetails: any = JSON.parse(
      localStorage.getItem('USERDATA') || '{}'
    );

    this.userId = userDetails._id;
    this.courseservice.sharedData$.subscribe((res: any) => {
      this.cartCount = res + this.cartData;
      // this.courseService.isCartCount.next(this.cartCount),
      console.log('this.cartCount==>',  this.cartCount);
    });
    this.courseservice.isCartCount$.subscribe((res: any) => {
      this.cartCount = res 
      // this.courseService.isCartCount.next(this.cartCount),
      console.log('cartCountsssssss==>',  this.cartCountsssssss);
    });

this.cartGetById()

    // this.courseservice.cartData$.subscribe((res:any)=>{
    //   console.log("res====>",res)
    // })
    if (this.userId) {
      this.getWishlist(this.userId)
    }
    this.courseService.wishListCount$.subscribe((res:any)=>{
      if(res){
        this.getWishlist(this.userId)
      }
    })
  }
  cartGetById(){
  if (this.userId) {
    this.courseService.cartGetById(this.userId).subscribe(
      (res: any) => {
     
        // this.cartAllData=res.data.cartI  d;
        this.cartData = res.data.total;
        this.courseService.isCartCount.next(this.cartData),
        this.cartDatas=res.data.cartId;

        //     this.cartItems?.forEach((element:any) => {
        //       this.cartData.push(element)
        //  });
         console.log("this.cartData",this.cartData)
      
      //  localStorage.removeItem('products')
            // this.cartData.push(this.localcartitem)
           
            this.deletyeLength=res.data.cartId.length;
            this.totalPrice=res.data.totalPrice;
      
        console.log('cartById==>',  res);
      },
      (err: any) => {
        console.log('cratById err', err);
      }
    );
  }
}
  deleteCartData(data:any,i:any){

    if(this.count){
      this.cartDatas.splice(i,1)
    console.log("this.cartData.",this.cartData)
    }else{
      console.log("data",data);
      this.deleteCartId=data._id;
      this.courseService.deleteCart(this.deleteCartId).subscribe((res:any)=>{
        console.log("deleteCart res",res);
        this.toastr.success('Cart Item Deleted Sucessfully');
        // this.length=res.data.total
        this.cartGetById();
        this.courseService.sharedData.next(this.deletyeLength);
  
      },(err:any)=>{
        console.log("deleteCart err",err)
      })
    }



  }


  private onFormValid() {}

  get f(): { [key: string]: AbstractControl } {
    return this.signInForm.controls;
  }
  get g(): { [key: string]: AbstractControl } {
    return this.verfyOtpForm.controls;
  }
  get a(): { [key: string]: AbstractControl } {
    return this.admitForm.controls;
  }
  editNumber() {
    this.verifyOTP = false;
    this.stop();
    this.verfyOtpForm.reset();
    this.signInForm.enable();
  }
  signIn(): void {
    console.log('router', this.router.url);
    if (this.signInForm.invalid) {
      this.submitted = true;
      return;
    }

    this.submits = false;
    let body = {
      mobile_number: this.signInForm.value.mobile_number,
    };
    console.log('this.signInForm.value', this.signInForm.value);
    this.courseservice.sendTheSms(body).subscribe(
      (res: any) => {
        this.verifyOTP = true;
        this.numbeResponse = res.data.mobile_number.toString();
        this.timer(1);
        console.log('res', res);
        console.log('numbeResponse', this.numbeResponse);
        this.signInForm.disable();

        this.toastr.success(res.message, '', {
          timeOut: 3000,
        });
        // this.snackBar.open(res.message, '', {
        //   duration: 3000,
        //   verticalPosition: 'top',
        //   horizontalPosition: 'right',
        //   panelClass: ['mat-sucess'],
        // });
      },
      (err: any) => {
        console.log('err', err);
      }
    );
  }
  change(event: any) {
    this.code = event.target.value;
    console.log('event.target.value', event.target.value);
  }
  verifyOtp() {
    if (this.verfyOtpForm.invalid) {
      this.submits = true;
      return;
    }
    let sendObj = {
      mobile_number:this.numbeResponse,
      code: this.code,
    };

    this.courseservice.verifyTheSms(sendObj).subscribe(
      (res: any) => {
        this.userData = res?.data;
        console.log("this.userData",this.userData)
        this.userDetails = res.data;
        this.userToken = res.data.token;
        this.verfyOtpForm.disable();
        this.verifytoken = res.data.token;
        this.usersId=res.data._id
        console.log("this.usersId====>",this.usersId)
        console.log("resverify",res)
        this.addtocart()
        if (res.data.newUser === true) {
          this.admitCardDetails = true;
        } else {
          this.verifyOTP = false;
          // this.verfyOtpForm.reset();
          console.log("resverify",res)
          document.getElementById('close')?.click();
          window.location.reload();
          localStorage.setItem('USERDATA', JSON.stringify(this.userDetails));
          localStorage.setItem('USERTOKEN', JSON.stringify(this.userToken));
          this.logins = true;
       
          //  this.courseservice.close()
          // get return url from query parameters or default to home page
          // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          // this.router.navigateByUrl(returnUrl);
        }
        this.stop();
      },
      (err: any) => {
        this.submits = true;
        this.verfyOtpForm.invalid;
        console.log('err', err);
        this.toastr.error('Invalid OTP', '', {
          timeOut: 3000,
        });
      }
    );
  }
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  timer(minute: number) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    this.timerInterval = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.displayedtime = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      console.log('this.displayedtime ', this.displayedtime);
      if (seconds == 0) {
        console.log('finished');
        clearInterval(this.timerInterval);
        this.resendOtp = true;
      }
    }, 1000);
  }
  stop() {
    clearInterval(this.timerInterval);
  }
  resend() {
    this.signIn();
    this.resendOtp = false;
  }
  admitDetailsSubmit() {
    console.log('admit details form value', this.admitForm.value);
    let body: any = {
      userAuthId: this.userData?._id,
      name: this.admitForm.value.fullName,
      email: this.admitForm.value.gmail,
      city: this.admitForm.value.city,
      role: this.admitForm.value.role,
      whatsapp: this.admitForm.value.reminders,
    };
    this.courseservice.loginprofile(body).subscribe(
      (res: any) => {
        this.router.navigate(['']);
        console.log('admit res', res);
        this.userDetails = res.data;
        this.userToken = res.data.token;
        this.enterdetails = false;
        this.logins = true;
        window.location.reload();
        localStorage.setItem('USERDATA', JSON.stringify(this.userDetails));
        console.log('USERDATA', this.userDetails);
        localStorage.setItem('USERTOKEN', JSON.stringify(this.userToken));
        this.toastr.success(res.message, '', {
          timeOut: 3000,
        });

        console.log('admitForm', this.admitForm);
        document.getElementById('close')?.click();
      },
      (err: any) => {
        console.log('admit res', err);
      }
    );
  }
  searchCites(event: any) {
    const pageparams = event.target.value
      ? `?search=${event.target.value}`
      : '';
    // this.courseService.verifyOTP(pageparams).subscribe(
    //   (res: any) => {
    //     if (res) {
    //       this.isCities = true;
    //       this.cities = res.data;
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.isCities = false;
    //   }
    // );
  }
  getCity(city: any) {
    this.admitForm.get('city')?.setValue(city);
    this.isCities = false;
  }
  signOut() {
    localStorage.removeItem('USERTOKEN');
    localStorage.removeItem('USERDATA');
    this.logins = false;
    window.location.reload();
  }

  addtocart(){
    console.log("this.UserID",this.UserID)
    if(this.productsCount){
   console.log("this.productsCount at api",this.productsCount)
   this.productsCount.forEach((ele:any) => {
      console.log("ele",ele)
      let body={
       userId:this.UserID,
       courseId:ele._id   
     }
   this.courseService.createCratData(body).subscribe((res:any)=>{
    console.log("pushedData",res)

     this.cartId=res.data.cartData._id

     this.courseService.cartGetById(this.cartId).subscribe((res:any)=>{
      this.cartLength=res.data.total;
      // this.cartGetById()
      this.courseService.isCartCount.next(this.cartLength);
      if(this.userData){
      localStorage.removeItem('products')
      }


    },(err:any)=>{
     console.log("cartGetById err",err)
    })
     },
     (err:any)=>{
       console.log("cart err",err)
     });


   });

 }


}


// cartGetById(){
//   this.courseService.cartGetById(this.userId).subscribe((res:any)=>{
//     console.log("cartGetById res",res);
//     this.cartData=res.data.cartId;
//  console.log("this.cartData getall",res)
    
//   },(err:any)=>{
//     console.log("cratById err",err)
//   })
// }

getWishlist(id: any) {
  this.courseService.getAllWishlist(id).subscribe(
    (res: any) => {
      this.wishlistData = res?.data?.total;
      console.log("wishlistData", this.wishlistData)
    },
    (err) => {
      console.log(err);
    }
  );
}

  
}
