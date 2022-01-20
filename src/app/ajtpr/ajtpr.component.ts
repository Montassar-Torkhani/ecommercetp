import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Produit } from '../produit';

@Component({
  selector: 'app-ajtpr',
  templateUrl: './ajtpr.component.html',
  styleUrls: ['./ajtpr.component.css']
})
export class AjtprComponent implements OnInit {
newProd:Produit={
  category:"",
description:"",
image:"",
price:0,
title:"",
rating:{
rate:0,
count:0,
}

}

  constructor(private http:HttpClient) { }

  ngOnInit(): void { }

  postPord(f:any){
this.newProd.category=f.category
this.newProd.description=f.description
this.newProd.image=f.image
this.newProd.price=f.price
this.newProd.title=f.title
this.newProd.rating={
rate:f.rate,
count:f.count    
}
 this.http.post("http://localhost:3000/products",f).subscribe(res=>{
  console.log(res);
 })
  }

  deleteItem(id:number){
    this.http.delete("http://localhost:3000/products/"+id).subscribe(res=>{
      console.log(res);
    })
    }
  
  
  
  
  
  }
