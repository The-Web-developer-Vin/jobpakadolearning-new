import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { courseService } from 'src/app/Pages/shared/services/courses/courses.service';
import { ToastrService } from 'ngx-toastr';
// import { OwlOptions } from 'ngx-owl-carousel-o';
// import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // carouselOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: true,
  //   dots: false,
  //   navSpeed: 400,
  //   nav: true,
  //   navText: ['', ''],
  //   center: false,
  //   startPosition: 0,
  //   items: 2.25,
  // };
  // products: any[] = [
  //   { class: 'red' },
  //   { class: 'green' },
  //   { class: 'blue' },
  //   { class: 'pink' },
  //   { class: 'gray' },
  //   { class: 'violet' },
  //   { class: 'brown' },
  // ];
  product=0;
  sharedData: any;
  public typewriter_display: string = '';
  slidetogglers: any = {};
  private _writerIndex = 0;
  private _canType: boolean = true;
  private arr: string[] = [
    'Career',
    'Future',
  ];
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
  productsCount: any;
  cartsLength: any;
  storeItem: any;
  cartItemArray:any=[]
  constructor(private courseServices:courseService,
    private router:Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService
    ) { 
       this.data=localStorage.getItem('USERDATA')
    console.log("data",this.data)
    this.courseServices.isCartCount.subscribe((res) => {
      this.cart = res;
       console.log('this.cart', this.cart);
  });

  this.productsCount=JSON.parse(localStorage.getItem('products')!);
  this.cartsLength=this.productsCount?.length
  console.log("this.productsCount",this.productsCount);
}

  ngOnInit(): void {

    this.typingInitiating(this._writerIndex);
    this.getAllCoursesData();
    this.getSingleCourseData();
    // let id = this.route.snapshot.paramMap.get('id');

    // this.courseServices.sharedData$
    // .subscribe(sharedData => this.sharedData = sharedData);
    // this.addToCart();

    let userDetails:any = JSON.parse(localStorage.getItem("USERDATA") || '{}');
 
    this.userId=userDetails._id
    console.log("userDetails===>",this.userId)
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

  // customOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: false,
  //   touchDrag: false,
  //   pullDrag: false,
  //   dots: false,
  //   navSpeed: 700,
  //   navText: ['', ''],
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 2
  //     },
  //     740: {
  //       items: 3
  //     },
  //     940: {
  //       items: 4
  //     }
  //   },
  //   nav: true
  // }

  getAllCoursesData(){
    this.courseServices.getAllCourses().subscribe((res:any)=>{
      console.log("courses res",res)
      this.coursesData=res?.data;
    },(err:any)=>{
      console.log("courses err",err)
    })
  }

  getSingleCourseData(){
    this.courseServices.getAllCoursesData().subscribe((res:any)=>{
      console.log("single Course res",res)
      this.singleCourseData=res.data.course;
    //     res.data.course.forEach((element:any,index:any) => {
    //   console.log("index",index)
    // });
    },(err:any)=>{
      console.log("single course err",err)
    })
  }

  addToCart(id:any){
    // console.log("id***********",id)
    this.courseId=id._id

  if (!this.data){
    // this.product++
    this.storeItem=id
    this.cartItemArray.push(this.storeItem)
    localStorage.setItem('products', JSON.stringify(this.cartItemArray));
    this.courseServices.sharedData.next(this.cartItemArray.length);
      }else{
        // if(this.productsCount){
        //   console.log("this.productsCount at api",this.productsCount)
        //   this.productsCount.forEach((ele:any) => {
        //      console.log("ele",ele)
        //   });
        // }
        let body={
          userId: this.userId,
          courseId:this.courseId
        }
        this.courseServices.createCratData(body).subscribe((res:any)=>{
          // console.log("cartData res",res)
          this.cartId=res.data.cartData.userId
            console.log("this.cartId",res)
          this.courseServices.cartGetById(this.cartId).subscribe((res:any)=>{
             console.log("cartGetById res===>",res);
            this.cartLength=res.data.total;
            this.toastr.success('Cart Item Added Sucessfully');
         // this.cartLength=this.cartLength++
            console.log("this.cartLength",this.cartLength);
            this.courseServices.isCartCount.next(this.cartLength);
            // this.courseServices.sharedData.next(this.cartLength);
            // this.courseServices.sharedData.next(this.product);
            // this.courseServices.cartData.next(this.cartLength);

          },(err:any)=>{
           console.log("cartGetById err",err)
          })
        },
        (err:any)=>{
          console.log("cart err",err)
        });
      }




}
}
