import { map } from 'rxjs';
import { ApiService } from './../../services/api.service';
import { CartService } from './../../services/cart.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit   {

  id: number = 0;
  product:any[] = [];
  thumbImages:any[] = [];
  constructor(private cartService: CartService,
              private api:ApiService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      map((param:ParamMap)=>{
        //@ts-ignore
        return param.params.id;
      })
    )
    .subscribe(prodId => {
      this.id = prodId;
      this.api.getSingleProduct(this.id).subscribe(prod => {
        this.product = prod ;
        if(prod.images != null){
          this.thumbImages = prod.images.split(';');
        }
      })
    });
  }

addToCart(id:number){

  this.cartService.addtoCart(this.product);
}

}
