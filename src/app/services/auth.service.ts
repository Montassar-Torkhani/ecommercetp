import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = false;
  private SERVER_URL = 'http://localhost:3000';
  public userid?:number ;
  
  authState$ = new BehaviorSubject<boolean>(this.auth);


 

  constructor(  private httpClient:HttpClient,
    private router:Router,) { if(localStorage.getItem('isloggedIn')=='true'){
      this.auth=true;
     
      this.userid = parseInt(localStorage.getItem('loggedUser')|| '{}') 

    } 
  }

  loggedUser(id:number):Observable<any>{
    return this.httpClient.get<any>(this.SERVER_URL +"/users/"+id)
   }
  logOut(){
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('isloggedIn');
    window.location.reload();
    this.router.navigate(['/']);
  }
}
