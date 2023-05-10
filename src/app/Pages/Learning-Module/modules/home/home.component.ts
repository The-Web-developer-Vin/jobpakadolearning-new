import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { courseService } from 'src/app/Pages/shared/services/courses/courses.service';
// import { OwlOptions } from 'ngx-owl-carousel-o';
// import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  product = 0;
  sharedData: any;
  public typewriter_display: string = '';
  slidetogglers: any = {};
  private _writerIndex = 0;
  private _canType: boolean = true;
  private arr: string[] = ['Career', 'Future'];
  coursesData: any;
  singleCourseData: any;
  webData: any;
  categorieName: any;
  userId: any;
  courseId: any;
  cartId: any;
  cartLength: any;
  data: string | null;
  cart: any;
  productsCount: any = [];
  cartsLength: any;
  storeItem: any;
  cartItemArray: any = [];
  itemData: any = [];
  productsCounts: any = [];
  filterCartItems: any = [];
  findCartId:any
  isSpiner: boolean[] = [];
  constructor(
    private courseServices: courseService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.data = localStorage.getItem('USERDATA');
    this.courseServices.isCartCount.subscribe((res) => {
      this.cart = res;
    });

    this.productsCount = JSON.parse(localStorage.getItem('products')!);
    this.productsCounts = this.productsCount;
    this.cartsLength = this.productsCount?.length;
  }

  ngOnInit(): void {
    this.typingInitiating(this._writerIndex);
    let userDetails: any = JSON.parse(localStorage.getItem('USERDATA') || '{}');
    this.userId = userDetails._id;
    this.getAllCoursesData();
    this.getSingleCourseData();

    if (this.productsCount) {
      this.cartItemArray = this.productsCount;
    }
  }
  public onButtonClick(): void {
    this._canType = !this._canType;
    if (this._canType) {
      this.typingInitiating(this._writerIndex);
    }
  }
  public typingInitiating(index: number): void {
    if (this._canType) {
      if (this.arr[index] !== undefined) {
        this.typeStringWithDelay(this.arr[index]);
      } else {
        this._writerIndex = 0;
        this.typeStringWithDelay(this.arr[this._writerIndex]);
      }
    }
  }

  private typeStringWithDelay(element: string, index: number = 0): void {
    if (element[index] !== undefined) {
      setTimeout(() => {
        this.typewriter_display += element[index];
        this.typeStringWithDelay(element, index + 1);
      }, 300);
    } else {
      this.eraseStringWithDelay();
    }
  }

  private eraseStringWithDelay: () => void = () => {
    if (this.typewriter_display.length > 0) {
      setTimeout(() => {
        this.typewriter_display = this.typewriter_display.substring(
          0,
          this.typewriter_display.length - 1
        );
        this.eraseStringWithDelay();
      }, 600);
    } else {
      this._writerIndex += 1;
      this.typingInitiating(this._writerIndex);
    }
  };

  SlideDown(position: any) {
    let active = this.slidetogglers[position]
      ? !this.slidetogglers[position]
      : true;
    for (const [key, value] of Object.entries(this.slidetogglers)) {
      this.slidetogglers[key] = false;
    }
    this.slidetogglers[position] = active;
  }

  getAllCoursesData(spiner?:any) {
    if(spiner){
      this.isSpiner[this.courseId] = true
    }
    this.courseServices.getAllCourses().subscribe(
      (res: any) => {
        this.isSpiner[this.courseId] = false
        this.coursesData = res?.data;
        this.findCartId = this.cartItemArray.filter((item:any) => this.coursesData.indexOf(item) < 0);
      },
      (err: any) => {
        console.log('courses err', err);
      }
    );
  }

  getSingleCourseData() {
    let params = this.userId ? `?userId=${this.userId}` : '';
    this.courseServices.getAllCoursesData(params).subscribe(
      (res: any) => {
        this.singleCourseData = res.data.course;
      },
      (err: any) => {
        console.log('single course err', err);
      }
    );
  }

  addToCart(id: any, i:any) {
    this.itemData = id;
    this.courseId = id._id;
    this.isSpiner[this.courseId] = true
    this.getAllCoursesData(true)
    if (!this.data) {
      this.storeItem = id;
      let findId = this.cartItemArray.find((x: any) => x._id === this.courseId);
      if (findId) {
        this.toastr.error('Already Item Added');
      } else {
        this.cartItemArray.push(this.storeItem);
        this.toastr.success('Item Added Successfully');
      }
      this.courseServices.sharedData.next(this.cartItemArray);
      localStorage.setItem('products', JSON.stringify(this.cartItemArray));
    } else {
      let body = {
        userId: this.userId,
        courseId: this.courseId,
      };
      this.courseServices.createCratData(body).subscribe(
        (res: any) => {
          this.toastr.success(res.message);
          this.cartId = res.data.cartData.userId;
          this.courseServices.cartGetById(this.cartId).subscribe(
            (res: any) => {
              this.cartLength = res.data.total;
              this.courseServices.isCartCount.next(this.cartLength);
            },
            (err: any) => {
              console.log('cartGetById err', err);
            }
          );
        },
        (err: any) => {
          console.log('cart err', err);
          this.toastr.error(err.error.message);
        }
      );
    }
  }
  wishlist(data: any) {
    if (this.userId) {
      let obj = {
        userId: this.userId,
        courseId: data?._id,
      };
      this.courseServices.creatWishlist(obj).subscribe(
        (res: any) => {
          this.courseServices.wishListCount.next(1);
          this.toastr.success(res.message);
          this.getSingleCourseData();
        },
        (err) => {
          console.log(err);
        }
      );
      return;
    }
    // this.loginModal = true;
    this.courseServices.loginModal.next(true);
    // this.toastr.error("Please login to continue...")
  }
  removeWishlist(id: any) {
    // this.courseServices.removeWishlist(id).subscribe(
    //   (res: any) => {
    //     console.log(res);
    //     if (res) {
    //       this.courseServices.wishListCount.next(1)
    //       this.getSingleCourseData()
    //       this.toastr.success(res.message)
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }
}
