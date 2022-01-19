import { ToastrService } from 'ngx-toastr';
import { cartUrl, productsUrl } from './../config/api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CartService {


  public data : any =[]
  public cartTotal =0
  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  // Data variable to store the cart information on the client's local storage



  constructor(private http:HttpClient,
    private toast: ToastrService) {}

  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product : any){
    let productExists = false
    for (let i in this.cartItemList) {
      if (this.cartItemList[i].id === product.id) {

        this.cartItemList[i].quantity++;
        this.cartItemList[i].total= this.cartItemList[i].quantity * this.cartItemList[i].price;
        productExists = true
        localStorage.setItem('cart',JSON.stringify(this.cartItemList))
        this.toast.info(`${product.name} quantity updated in the cart.`, "Product Updated", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        })
        break;
      }
    }

    if (!productExists) {
      this.cartItemList.push(product);
      this.productList.next(this.cartItemList);
      localStorage.setItem('cart',JSON.stringify(this.cartItemList));

      this.toast.success(`${product.name} added to the cart.`, "Product Added", {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      })

    }

      this.data =JSON.stringify(localStorage.getItem('cart'))
      console.log(this.data)






  }



  getCartItems():Observable<any[]>{
       return this.http.get<any[]>(cartUrl);
  }

  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
}

interface carts {
  cart_id : number;
  products : any [];
}
