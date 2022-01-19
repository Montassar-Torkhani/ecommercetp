import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private SERVER_URL = 'http://localhost:3000';
   public loggedUser?:number;
   public isloggedIn: Boolean = false;
 
   public loginForm!: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private  http:HttpClient,
    private authService:AuthService,
  ) { }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    })
  }

  login(f:NgForm){
    let res:any
    new Promise((resolve, reject) => {
      this.http.get<any>(this.SERVER_URL +"/users").subscribe(data=>{
        console.log(f); 
      res=data
      resolve(res)
      })
    }).then(d=>{
res=d
for(let i=0;i<res.length;i++){
  console.log(f.value.email);
  console.log(f);
if((res[i].email==f.value.email)&&(res[i].password==f.value.password)){

alert("welcome back "+res[i].nom)
this.loggedUser = res[i].id;
this.isloggedIn = true;
localStorage.setItem('loggedUser',String(this.loggedUser));
localStorage.setItem('isloggedIn',String(this.isloggedIn));
this.authService.auth=true;
break
} else if(i==res.length-1){
alert("user not found")
window.location.reload

}
}
    })

}
}
