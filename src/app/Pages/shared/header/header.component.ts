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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InstructorComponent } from '../../Learning-Module/modules/instructor/instructor.component';

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
  cart: any;
  cartCountsssssss: any;
  productsCount: any;
  cartLength: any;
  cartId: any;
  usersId: any;
  UserID: any;
  cartDatas: any = [];
  deletyeLength: any;
  totalPrice: any;
  deleteCartId: any;
  wishlistData: any = 0;
  isLognModal: boolean = false;
  isSideCart: boolean = false;
  usersName: any;
  constructor(
    private fb: FormBuilder,
    private courseservice: courseService,
    private router: Router,
    // private snackBar: MatSnackBar,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _activatedRoute: ActivatedRoute,
    private courseService: courseService,
    private modalService: NgbModal
  ) {
    this.productsCount = JSON.parse(localStorage.getItem('products')!);
    this.cartDatas = this.productsCount;
    if (this.productsCount) {
      this.cartCount = this.productsCount?.length;
    }

    this.userData = JSON.parse(localStorage.getItem('USERDATA')!);
    this.UserID=this.userData?._id
    if (this.userData) {
     this.usersName=this.userData.Name
    //  console.log("usersName",this.usersName)
    //  this.courseservice.isUserName.next(this.usersName)
      this.logins = true;
    }

    this.courseservice.isUserName$.subscribe((res: any) => {
      this.usersName = res;
      // console.log("this.usersName",this.usersName)
    });

    this.courseService.isCartCount.subscribe((res) => {
      // alert('here');
      this.cart = res;
      this.toastr.success('Item Cart Successfully');
    });
    this.courseservice.deletecartlength$.subscribe((res: any) => {
      this.cartCount = res;
      // this.toastr.success("Item Cart Successfully")
      // console.log('this.cartCount==------>', this.cartCount);
    });

    if (this.userData) {
      this.addtocart();
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
    this.count = sharedData;
    let userDetails: any = JSON.parse(localStorage.getItem('USERDATA') || '{}');
    this.userId = userDetails._id;
    this.courseservice.sharedData$.subscribe((res: any) => {
      this.cartCount = res + this.cartData;
      if (res) {
        this.productsCount = JSON.parse(localStorage.getItem('products')!);
        this.cartDatas = this.productsCount;
        if (this.productsCount) {
          this.cartCount = this.productsCount?.length;
        }
      }
    });
    this.courseservice.isCartCount$.subscribe((res: any) => {
      this.cartCount = res;
      if (res) {
        this.cartGetById();
      }
    });

    this.cartGetById();

    if (this.userId) {
      this.getWishlist(this.userId);
    }
    this.courseService.wishListCount$.subscribe((res: any) => {
      if (res) {
        this.getWishlist(this.userId);
      }
    });
    this.courseService.sharedData.subscribe((res: any) => {
      if (res) {
        this.cartDatas = res;
        this.cartCount = res?.length;
        this.cartGetById();
      }
    });
    this.courseService.loginModal$.subscribe((res: any) => {
      if (res == true) {
        this.isLognModal = true;
      }
    });
  }
  cartGetById() {
    if (this.userId) {
      this.courseService.cartGetById(this.userId).subscribe(
        (res: any) => {
          this.cartData = res.data.total;
          this.cartDatas = res.data.cartId;
          // console.log('this.cartDatas', this.cartDatas);
          this.deletyeLength = res.data.cartId.length;
          this.totalPrice = res.data.totalPrice;
        },
        (err: any) => {
          console.log('cratById err', err);
        }
      );
    }
  }
  deleteCartData(data: any, i: any) {
    if (this.count) {
      this.cartDatas.splice(i, 1);
    } else {
      this.deleteCartId = data._id;
      this.courseService.deleteCart(this.deleteCartId).subscribe(
        (res: any) => {
          this.toastr.success('Cart Item Deleted Sucessfully');
          this.cartGetById();
          this.courseService.sharedData.next(this.deletyeLength);
        },
        (err: any) => {
          console.log('deleteCart err', err);
        }
      );
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
    if (this.signInForm.invalid) {
      this.submitted = true;
      return;
    }

    this.submits = false;
    let body = {
      mobile_number: this.signInForm.value.mobile_number,
    };
    this.courseservice.sendTheSms(body).subscribe(
      (res: any) => {
        this.verifyOTP = true;
        this.numbeResponse = res.data.mobile_number.toString();
        this.timer(1);
        this.signInForm.disable();
        this.toastr.success(res.message, '', {
          timeOut: 3000,
        });
      },
      (err: any) => {
        console.log('err', err);
      }
    );
  }
  change(event: any) {
    this.code = event.target.value;
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
        // console.log("res======>",res)
        this.userData = res.data;
     
        // console.log("this.userData.newUser",this.userData.newUser)
        if(this.userData.newUser===true && this.userData.role ==='User' || this.userData.newUser===true && this.userData.role !="Instructor"  ){
         this.admitCardDetails = true;
          }else{ 
             this.userData = res.data;
            // console.log("this.userData",this.userData)
            this.userToken = res.data.token;
            // console.log("Token",this.userToken)
            this.toastr.success(res.message, '', {
              timeOut: 3000,
            });
            localStorage.setItem('USERDATA', JSON.stringify(this.userData));
            localStorage.setItem('USERTOKEN', JSON.stringify(this.userToken));
            this.logins=true
      
            this.isLognModal= false
            if (this.userData) {
              this.usersName=this.userData.Name
              // console.log("usersName",this.usersName)
              this.courseservice.isUserName.next(this.usersName)
               this.logins = true;
             }
            //  this.verifyOTP=false;
              // this.verfyOtpForm.reset();
              // this.signInForm.reset();
              // this.admitForm.reset();
          }
        this.stop();
      },
      (err: any) => {
        this.submits = true;
        this.verfyOtpForm.invalid;
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
    let body: any = {
      userAuthId: this.userData?._id,
      name: this.admitForm.value.fullName,
      email: this.admitForm.value.gmail,
      city: this.admitForm.value.city,
      role: "User",
      whatsapp: this.admitForm.value.reminders,
    };
    this.courseservice.loginprofile(body).subscribe(
      (res: any) => {
        this.userData = res.data
        this.userToken = res.token;
          this.toastr.success(res.message, '', {
          timeOut: 3000,
        });
        // console.log("this.userDetails", this.userData)
        localStorage.setItem('USERDATA', JSON.stringify(this.userData));
        localStorage.setItem('USERTOKEN', JSON.stringify(this.userToken));
        this.logins = true;
        this.isLognModal= false
        // window.location.reload()
        if (this.userData) {
          this.usersName=this.userData.Name
          // console.log("usersName",this.usersName)
          this.courseservice.isUserName.next(this.usersName)
           this.logins = true;
         }
        //  this.verfyOtpForm.reset();
        // this.logins = true;
        //  this.signInForm.reset();
        //  this.admitForm.reset();
      },
      (err: any) => {
      }
    );
  }
  searchCites(event: any) {
    const pageparams = event.target.value
      ? `?search=${event.target.value}`
      : '';
  }
  getCity(city: any) {
    this.admitForm.get('city')?.setValue(city);
    this.isCities = false;
  }
  signOut() {
    localStorage.removeItem('USERTOKEN');
    localStorage.removeItem('USERDATA');
    this.logins = false;
    window.location.reload()
  }

  addtocart() {
    console.log('this.UserID', this.UserID);
    if (this.productsCount) {
      console.log('this.productsCount at api', this.productsCount);
      this.productsCount.forEach((ele: any) => {
        console.log('ele', ele);
        let body = {
          userId: this.UserID,
          courseId: ele._id,
        };
        this.courseService.createCratData(body).subscribe(
          (res: any) => {
            console.log('pushedData', res);

            this.cartId = res.data.cartData._id;

            this.courseService.cartGetById(this.cartId).subscribe(
              (res: any) => {
                this.cartLength = res.data.total;
                // this.cartGetById()
                this.courseService.isCartCount.next(this.cartLength);

                if (this.userData) {
                  localStorage.removeItem('products');
                }
              },
              (err: any) => {
                console.log('cartGetById err', err);
              }
            );
          },
          (err: any) => {
            console.log('cart err', err);
          }
        );
      });
    }
  }


  getWishlist(id: any) {
    this.courseService.getAllWishlist(id).subscribe(
      (res: any) => {
        this.wishlistData = res?.data?.total;
        // console.log('wishlistData', this.wishlistData);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  loginModal() {
    this.isLognModal = true;
  }
  closeLoginModal() {
    this.isLognModal = false;
  }
  showSideCart() {
    this.isSideCart = true;
    // document.body.classList.add('ishidden');
  }
  closeCart() {
    this.isSideCart = false;
    // document.body.classList.remove('ishidden');
  }
  goToCart() {
    this.router.navigate(['/cart']);
    this.closeCart();
  }
  goToHome() {
    this.router.navigate(['/']);
    this.closeCart();
  }
  instructorModal() {
    this.modalService.open(InstructorComponent);
  }
  removeCart(i:any){
    
    this.cartDatas.splice(i,1)
    localStorage.setItem('products', JSON.stringify(this.cartDatas));
    this.cartCount = this.cartDatas.length

  }
}
