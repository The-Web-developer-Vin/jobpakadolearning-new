import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TitleStrategy } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { courseService } from 'src/app/Pages/shared/services/courses/courses.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss'],
})
export class MyCoursesComponent implements OnInit {
  presentTab: any = 'deposits';
  tabs: any = {
    Publish: true,
    Pending: false,
    Draft: false,
  };
  myCourseData: any;
  createUserForm!: FormGroup;
  submitted = false;
  userId: any;
  userData: any;
  modifyData: any;
  filePhoto: any;
  imageAttr: any;
  userAuthId: any;
  profileUserId: any;
  image: any;
  url: any;
  profileImage:any
  constructor(
    private courseService: courseService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.myCourseGetAll();

    let userDetails: any = JSON.parse(localStorage.getItem('USERDATA') || '{}');
    console.log('userDetails', userDetails);
    if (userDetails) {
      this.userId = userDetails?._id;
      console.log('userId', this.userId);
    }
    // this.courseService.getCreateUserData(this.userId).subscribe((res:any)=>{
    //   console.log("getId res",res)
    // },(err:any)=>{
    //   console.log("getId err",err)
    // })

    this.createUserForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      Email: new FormControl('', [Validators.required, Validators.email]),
      mobile_number: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      profilePhoto: new FormControl(null),
    });

    this.getByUserId();
  }

  getByUserId() {
    this.courseService.getCreateUserData(this.userId).subscribe(
      (res: any) => {
       
        this.modifyData = res.data;
        console.log(" this.modifyData",this.modifyData)
        this.image = res.data.profilePhoto;
        this.profileImage = res.data.profilePhoto
        console.log(' this.profileImage', this.profileImage);
        this.userAuthId = res.data.userAuthId._id;
        this.profileUserId = res.data._id;
        console.log('modifyData', this.modifyData.userAuthId
        .Email,); 
        // this.createUserForm.patchValue(this.modifyData);
        this.createUserForm.patchValue({
          Email: this.modifyData?.userAuthId
          .Email,
          Name: this.modifyData?.userAuthId.Name,
          mobile_number: this.modifyData?.userAuthId?.mobile_number,
          city: this.modifyData?.userAuthId?.city,
          country: this.modifyData?.country,
          dob: this.modifyData?.dob,
          state: this.modifyData?.state,
          profilePhoto: this.modifyData?.profilePhoto,
       
          // profilePhoto :"https://learningbackend.jobpakado.com/" + this.modifyData.profilePhoto,
        });
      },
      (err: any) => {
        console.log('getByUserId err', err);
      }
    );
  }
  menuTabs(tab: any) {
    this.presentTab = tab;
    console.log('tab', tab);
    (this.tabs.Publish = tab == 'publish' ? true : false),
      (this.tabs.Pending = tab == 'pending' ? true : false),
      (this.tabs.Draft = tab == 'draft' ? true : false);
    // this.spinner.hide();
  }

  myCourseGetAll() {
    this.courseService.getMyCourseByUserId().subscribe(
      (res: any) => {
        console.log('myCourse res', res);
        this.myCourseData = res.data.data;
      },
      (err: any) => {
        console.log('myCourse err', err);
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.createUserForm.invalid) {
      return;
    }

    // console.log(JSON.stringify(this.form.value, null, 2));
  }
  get f() {
    return this.createUserForm.controls;
  }

  fileSelectedImage(event: any) {
    console.log(event.target.files[0]);
    const file = Math.round(event.target.files[0].size / 1024);
    if (file > 10240) {
      // this.snackBar.open('Image size not more than 10mb', 'Close', {
      //   duration: 3000,
      //   panelClass: ['alert-red'],
      // });
      return;
    }
    this.filePhoto = event.target.files[0];
    this.imageAttr = this.filePhoto.name;
    let formData = new FormData();
    formData.append('image', this.filePhoto);
    console.log('this.imageAttr', this.imageAttr);
    this.courseService.commonUpload(formData).subscribe((res: any) => {
      console.log(res, 'res');
      this.profileImage = res?.data?.image
    });
  }

  logoFile(e: any) {
    console.log('e', e);
    this.imageAttr = e.target.files[0].name;
    console.log('iteme', e.target.files[0].name);
  }

  saveUser() {
    if (this.createUserForm.invalid) {
      this.toastr.error('Invalid Form', 'Close', {
        // duration: 3000,
        // panelClass: ['alert-red'],
      });
      return;
    }
    if (this.modifyData) {
      let formData = new FormData();

      formData.append('userId', this.profileUserId);
      formData.append('userAuthId', this.userAuthId);
      formData.append('Name', this.createUserForm.value.Name);
      formData.append('mobile_number', this.createUserForm.value.mobile_number);
      formData.append('profilePhoto', this.profileImage);
      formData.append('Email', this.createUserForm.value.Email);
      formData.append('city', this.createUserForm.value.city),
        formData.append('country', this.createUserForm.value.country);
      formData.append('dob', this.createUserForm.value.dob);
      formData.append('state', this.createUserForm.value.state);

      this.courseService.getCreateUpdatedUser(formData).subscribe(
        (res: any) => {
          this.toastr.success(res.message, 'Close', {});
        },
        (err: any) => {
          // this.toastr.success(err.error.message, 'Close', {
          //   duration: 3000,
          //   panelClass: ['alert-red'],
          // });
        }
      );
    } else {
      let formData = new FormData();
      formData.append('Name', this.createUserForm.value.name);
      formData.append('mobile_number', this.createUserForm.value.mobile_number);
      formData.append('profilePhoto', this.profileImage);
      formData.append('Email', this.createUserForm.value.email);
      formData.append('city', this.createUserForm.value.city),
        formData.append('country', this.createUserForm.value.country);
      formData.append('dob', this.createUserForm.value.dob);
      formData.append('state', this.createUserForm.value.state);
      this.courseService.getCreateUpdatedUser(formData).subscribe(
        (res: any) => {
          this.toastr.success(res.message, 'Close', {});
          console.log('getallusers', res);
        },
        (err: any) => {
          // this.snackBar.open(err.error.message, 'Close', {
          //   duration: 3000,
          //   panelClass: ['alert-red'],
          // });
          console.log('err', err);
        }
      );
    }
  }
}
