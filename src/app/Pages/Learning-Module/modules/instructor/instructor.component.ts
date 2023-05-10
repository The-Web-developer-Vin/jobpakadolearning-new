import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { courseService } from 'src/app/Pages/shared/services/courses/courses.service';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss']
})
export class InstructorComponent implements OnInit {
  isLognModal:boolean= false
  admitForm!: FormGroup;
  admitCardDetails: boolean = false;
  submitted = false;
  submits = false;
showPassword: boolean =false;
closeResult :any="";
isCities: boolean =true;
cities: any = [];
//  showPasswordOnPress: boolean =false;
  constructor( 
    private fb: FormBuilder,
    private toastr: ToastrService,
    private courseService: courseService,
    private modalService: NgbModal,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.admitForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', [Validators.required]],
      mobile_number:['', [Validators.required, Validators.minLength(10)] ],
      
      // reminders: [true],
    });
  }
  get a(): { [key: string]: AbstractControl } {
    return this.admitForm.controls;
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.admitForm.invalid) {
      return;
    }

    // console.log(JSON.stringify(this.form.value, null, 2));
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

  closeLoginModal(){
    this.modalService.dismissAll();
  }


  signUp() { 
    if (this.admitForm.invalid) {
      this.submitted = true;
      return;
    }
    // this.submits = false;
    let body = {
      Name: this.admitForm.value.name,
      Email: this.admitForm.value.email,
      city: this.admitForm.value.city,
      mobile_number:this.admitForm.value.mobile_number,
      role:"Instructor"
    };
    this.courseService.sendTheSms(body).subscribe(
      (res: any) => {
        // this.router.navigate(['']);
        // console.log("res",res)
        // this.toastr.success(res.message, '', {
        //   timeOut: 3000,
        // });
        this.toastr.success('Created Instructor Successfully');
        this.modalService.dismissAll();
      },
      (err: any) => {
        console.log("err",err)
      }
    );
   
  }

}
