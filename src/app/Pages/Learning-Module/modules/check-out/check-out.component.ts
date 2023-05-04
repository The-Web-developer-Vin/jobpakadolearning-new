import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  checkoutForm!:FormGroup
  submitted = false;
  constructor(
    private formBuilder: FormBuilder
  ) { }
  

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
        name: ['', Validators.required],
        email:['', Validators.required],
        country:['', Validators.required],
        state:['', Validators.required],
        postal:['', Validators.required],
        cardNumber:['', Validators.required],
        month:['', Validators.required],
        year:['', Validators.required],
        securityCode:['', Validators.required],

  });
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.checkoutForm.invalid) {
      return;
    }

    // console.log(JSON.stringify(this.form.value, null, 2));
  }
  
  get f() {
    return this.checkoutForm.controls;
  }
}
