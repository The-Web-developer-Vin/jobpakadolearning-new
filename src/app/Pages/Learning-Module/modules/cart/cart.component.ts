import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { courseService } from 'src/app/Pages/shared/services/courses/courses.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input() cartLength: any;
  @Output() messageEvent = new EventEmitter<string>();
  userId: any;
  cartData: any;
  deleteCartId: any;
  priceData: any;
  cartTitle: any;
  cartName: any;
  length: any;
  deletyeLength: any;
  cartImage: any;
  offerPrice: any;
  totalPrice: any;
  cartItems: any;
  userDetails: any;
  logins:boolean=false
  total:number=0
  localcartitem: any;
  cartId: any;
  outerCount=0
  offerCoupon:any
  offerTotalPrice: any;
  couponId:any;
  couponData: any;
  minAmount: any;
  couponType: any;
  coupoPercent: any;
  coupontotal: any;
  constructor(
    private courseService:courseService,
    private toastr: ToastrService

    ) {
          // console.log("cartLength",this.cartLength);
    this.userDetails = JSON.parse(localStorage.getItem("USERDATA") || '{}');
    // console.log("userDetails",userDetails)
    this.userId=this.userDetails._id;
    console.log("this.userDetails===>",this.userDetails)

    if (localStorage.getItem('USERDATA') != null) {
      this.logins = true;
    }
    this.addtocart()
     }

  ngOnInit(): void {
     this.addtocart()
    this.cartGetById();
    // this.cartData=res.data.cartId;
    this.cartItems=JSON.parse(localStorage.getItem('products')!);
    this.cartData=this.cartItems
    let sum=0
    this.cartData.forEach((element:any) => {
       sum += element.offerPrice;
    });
     this.totalPrice= sum
    console.log("this.localcartitem",this.localcartitem)
    console.log("this.cartData localstorage===>",this.cartData)
  }

  cartGetById(){
    this.courseService.cartGetById(this.userId).subscribe((res:any)=>{
      console.log("cartGetById res",res);
      this.cartData=res.data.cartId;

  //     this.cartItems?.forEach((element:any) => {
  //       this.cartData.push(element)
  //  });
   console.log("this.cartData",this.cartData)

//  localStorage.removeItem('products')
      // this.cartData.push(this.localcartitem)
      this.offerCoupon=1;
      this.deletyeLength=res.data.cartId.length;
      this.totalPrice=res.data.totalPrice;
      // this.offerTotalPrice = this.totalPrice - this.offerCoupon

      // res.data.cartId.forEach((element:any) => {
      // this.priceData=element.courseId.actualPrice,
      // this.cartTitle=element.courseId.title,
      // this.cartName=element.courseId.instructor?.name_as_per_bank,
      // this.cartImage=element.courseId.image,
      // this.offerPrice=element.courseId.offerPrice
    // });
           console.log("this.cartData", this.priceData);
      
    },(err:any)=>{
      console.log("cratById err",err)
    })
  }
  addtocart(){
           if(this.cartItems){
          console.log("this.productsCount at api",this.cartItems)
          this.cartItems.forEach((ele:any) => {
             console.log("ele",ele)
             let body={
              userId: this.userId,
              courseId:ele._id   
            }
          this.courseService.createCratData(body).subscribe((res:any)=>{
   this.cartId=res.data.cartData.userId
  //  localStorage.removeItem('products')
              this.courseService.cartGetById(this.cartId).subscribe((res:any)=>{
                this.cartLength=res.data.total;
                this.cartGetById()
                this.courseService.isCartCount.next(this.cartLength);
 
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
  deleteCartData(data:any,i:any){

    if(this.cartItems){
      this.cartData.splice(i,1)
      console.log("this.cartData.",this.cartData)
    }else{
      console.log("data",data);
      this.deleteCartId=data._id;
      this.courseService.deleteCart(this.deleteCartId).subscribe((res:any)=>{
        console.log("deleteCart res",res);
        this.toastr.success('Cart Item Deleted Sucessfully');
        // this.length=res.data.total
       this.courseService.sharedData.next(this.deletyeLength);
        this.cartGetById();
  
      },(err:any)=>{
        console.log("deleteCart err",err)
      })
    }
  }

  getCouponData(){
    let body={
      couponcode:this.couponId
    }
    this.courseService.getCouponData(body).subscribe((res:any)=>{
      console.log("coupon res",res);
      this.couponData=res.data;
      this.minAmount=res.data.couponAmount;
      // console.log("coupon res", this.minAmount);
      this.couponType=res.data.type;
      if(this.totalPrice >= this.minAmount){
          // this.offerTotalPrice=this.totalPrice - this.minAmount
          if( this.couponType=="percent"){
            this.offerTotalPrice=(this.totalPrice * this.minAmount )/100
           
            this.coupontotal=this.totalPrice - this.offerTotalPrice
            console.log("this.coupontotal", this.coupontotal);
          }else{
            this.offerTotalPrice=this.totalPrice - this.minAmount
          }
      }
      console.log("this.couponData",this.couponData)
    },(err:any)=>{
      console.log("coupon err",err)
    })
  }

}
