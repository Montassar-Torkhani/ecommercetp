import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
confirm =false
  public products:any;
  public filterCat :any;
  searchkey:string="";
  constructor(private api : ApiService , private  cartService:CartService, private http:HttpClient) { }

  ngOnInit(): void {
    this.api.getProduct()
      .subscribe(res=>{
        this.products =res;
        this.filterCat =res;
        this.products.forEach((a:any)=>{
          if(a.category ==="women's clothing" ||a.category ==="man's clothing"){
            a.category="fashion"
          }
          Object.assign(a,{quantity:1,total:a.price});
        });
      });

      this.cartService.search.subscribe((val:any)=>{
        this.searchkey = val;
      })
  }

  addToCart(p:any){

       this.cartService.addtoCart(p);
  }

  filter(category:string){

    this.filterCat = this.products.filter((a:any)=>{
      if(a.category == category || category==''){
        return a ;
      }
    })
  }

  DeleteProduit(id:number){
let c:any= (prompt("Are You Sure"))
if (c.toLowerCase() =="yes"||c.toLowerCase()=="oui"){

  this.confirm=true

}
else{
  this.confirm=false
}



 if(this.confirm){

this.http.delete("http://localhost:3000/products/"+id).subscribe(()=>{
  alert("delted")

window.location.reload()

})
}
  }
  }










