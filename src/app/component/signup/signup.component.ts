import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email_used:boolean = false;
  public signupForm !: FormGroup;
  private SERVER_URL = 'http://localhost:3000';
 
  comparePassword?: boolean;
  registrationMessage?: string;
  constructor(private formBuilder : FormBuilder, private Http:HttpClient,private router:Router) {

    }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fname: ['', [Validators.required, Validators.minLength(5)]],
      lname: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, ],

      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],

    })
    this.signupForm.valueChanges
    .pipe(map((controls) => {
      return this.formControls['confirmPassword'].value === this.formControls['password'].value;
    }))
    .subscribe(passwordState => {
      console.log(passwordState);
      this.comparePassword = passwordState;
    });
  }
  get formControls() {
    return this.signupForm.controls;
  }
  signUp(){
   console.log(this.signupForm.value)
     this.Http.post<any>(this.SERVER_URL +"/users",this.signupForm.value)
     .subscribe(res=>{
       alert("Signup Successfull");
       this.signupForm.reset();
       this.router.navigate(['login']);
     },err=>{
       alert("somthing went wrong");
     })
  }
  onCheckEmail(f:any){

    this.Http.get<any>(this.SERVER_URL +"/users")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.signupForm.value.email
      });
      if(user){
      this.email_used = true

      }else{
        this.email_used = false
      }
    },err=>{
      alert("somthing went wrong!!");
    })

  }
}
