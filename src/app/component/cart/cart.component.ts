import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public product :any = [];
  public Total:number = 0;
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res=>{

        this.product = res;



        this.product.forEach((item:any) => {
          this.Total += (item.quantity * item.price)

        })
      })

  }

  removeProduct(p:any){
    this.cartService.removeCartItem(p);
  }

  clearCart(){
    this.cartService.removeAllCart();
  }

}
