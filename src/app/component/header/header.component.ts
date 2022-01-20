import { cartUrl } from './../../config/api';
import { HttpClient } from '@angular/common/http';
import { taggedTemplate } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public cartData:any =[];
  public totalP : number=0;
  public searchterm : string ='';
  public total : number = 0 ;
  public qty =0;
  authState?:boolean;
  constructor(public cartService : CartService,
    public authService : AuthService,
               public http:HttpClient) { }

  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res=>{
        this.totalP = res.length;
        this.cartData = res;


        console.log(this.cartData)

        this.cartData.forEach((item:any) => {
          this.total +=item.total

        })
      })
      this.authState = this.authService.auth

  }

  search(event:any){
    this.searchterm =(event.target as HTMLInputElement).value;
    console.log(this.searchterm);
    this.cartService.search.next(this.searchterm);

  }
  logout(){
    this.authService.logOut();
    window.location.reload();
  }
}
