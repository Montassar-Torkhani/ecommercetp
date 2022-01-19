import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  myUser: any;
  id?:number;
  constructor(
    private authService: AuthService,
    private router: Router,
   private http: HttpClient) { 
    this.id = this.authService.userid;
    console.log(this.id)
   }

  ngOnInit(): void {
   this.authService.loggedUser(this.id!).subscribe(res => {
      this.myUser = res ;
      console.log(this.myUser);

    })
   
  }

  logout(){
    this.authService.logOut();
  }
}
