import { productsUrl } from './../config/api';
import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getProduct(){
    return this.http.get<any>(productsUrl)
      .pipe(map((res:any)=>{
        return res;
      }))
  }
  getSingleProduct(id:number):Observable<any>{
    return this.http.get<any>(productsUrl+id);
}
}
