import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { courseService } from 'src/app/Pages/shared/services/courses/courses.service';

@Component({
  selector: 'app-whish-list',
  templateUrl: './whish-list.component.html',
  styleUrls: ['./whish-list.component.scss'],
})
export class WhishListComponent implements OnInit {
  userId: any;
  wishlistData: any = [];
  constructor(
    private courseService: courseService,
    private toster: ToastrService
  ) {}

  ngOnInit(): void {
    let userDetails: any = JSON.parse(localStorage.getItem('USERDATA') || '{}');
    console.log('userDetails', userDetails);
    if (userDetails) {
      this.userId = userDetails?._id;
      this.getWishlist(userDetails?._id);
    }
  }
  getWishlist(id: any) {
    this.courseService.getAllWishlist(id).subscribe(
      (res: any) => {
        this.wishlistData = res?.data?.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  remove(id: any) {
    this.courseService.removeWishlist(id).subscribe(
      (res: any) => {
        console.log(res);
        if (res) {
          this.courseService.wishListCount.next(1);
          this.getWishlist(this.userId);
          this.toster.success(res.message);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  addTocart(data: any) {
    console.log('dsgsg', data?.courseId?._id);
    let body = {
      userId: this.userId,
      courseId: data?.courseId?._id,
    };
    this.courseService.createCratData(body).subscribe(
      (res: any) => {
        console.log(res);
        if (res) {
          this.toster.success(res.message);
          this.remove(data._id);
          this.getWishlist(this.userId);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
