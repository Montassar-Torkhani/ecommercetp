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

  login(f:any){
    console.log("aaa"+f.pass);
    
    let res:any
    new Promise((resolve, reject) => {
      this.http.get<any[]>("http://localhost:3000/users").subscribe(data=>{
        console.log(f); 
      res=data
      resolve(res)
      })
    }).then(d=>{
res=d
for(let i=0;i<res.length;i++){
  console.log(f.email);
  console.log(f.pass);
if((res[i].email==f.email)&&(res[i].password==f.pass)){

// alert("welcome back "+res[i].fname)
this.loggedUser = res[i].id;
this.isloggedIn = true;
localStorage.setItem('loggedUser',String(this.loggedUser));
localStorage.setItem('isloggedIn',String(this.isloggedIn));
this.authService.auth=true;
window.location.reload()
break
} else if(i==res.length-1){
alert("user not found")
window.location.reload()

}
}
    })

}
}
