import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
//  showPasswordOnPress: boolean =false;
  constructor( 
    private fb: FormBuilder,
    private toastr: ToastrService,
    private courseService: courseService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.admitForm = this.fb.group({
      fullName: ['', [Validators.required]],
      gmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      // reminders: [true],
    });
  }
  get a(): { [key: string]: AbstractControl } {
    return this.admitForm.controls;
  }

  closeLoginModal(){
    this.modalService.dismissAll();
  }


  loginIn() { 
    if (this.admitForm.invalid) {
      this.submitted = true;
      return;
    }
    this.submits = false;
    let body = {
      fullName: this.admitForm.value.fullName,
      gmail: this.admitForm.value.gmail,
      password: this.admitForm.value.password,
    };
    // console.log('this.signInForm.value', this.admitForm.value);
    this.courseService.sendTheSms(body).subscribe(
      (res: any) => {
        // this.verifyOTP = true;
        // this.numbeResponse = res.data.mobile_number.toString();
        // this.timer(1);
        console.log('res', res);
        // this.admitForm.disable();
        this.toastr.success(res.message, '', {
          timeOut: 3000,
        });
      },
      (err: any) => {
        console.log('err', err);
      }
    );
   
  }

}
