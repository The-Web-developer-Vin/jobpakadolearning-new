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
    this.cartData?.forEach((element:any) => {
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
   console.log("this.cartData",this.cartData)
      this.offerCoupon=1;
      this.deletyeLength=res.data.cartId.length;
      this.totalPrice=res.data.totalPrice;
this.addtocart();
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
        this.toastr.success('Cart Item Deleted Sucessfully')
        localStorage.setItem('products', JSON.stringify(this.cartItems));
        this.courseService.sharedData.next(this.cartItems);
        // this.courseService.deletecartlength.next(this.cartItems.length);
        }else{
          this.deleteCartId=data._id;
          this.courseService.deleteCart(this.deleteCartId).subscribe((res:any)=>{
            this.toastr.success('Cart Item Deleted Sucessfully');
            this.length=res.data.total
          this.courseService.sharedData.next(this.deletyeLength);
            this.cartGetById();
            this.getCouponData();
            setTimeout(() => {
              window.location.reload()
              }, 1000);
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
           
            this.coupontotal=this.totalPrice - this.offerTotalPrice;
            this.cartGetById();
          }else{
            this.offerTotalPrice=this.totalPrice - this.minAmount
          }
      }
      console.log("this.couponData",this.couponData);
    
    },(err:any)=>{
      console.log("coupon err",err)
    })
  }

}
