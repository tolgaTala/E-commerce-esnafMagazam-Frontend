import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket } from '../models/basket';
import { BasketDto } from '../models/basketDto';
import { ListResponseModel } from '../models/ListResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  
  apiUrl = "https://localhost:44312/api/baskets"
  constructor(private httpClient: HttpClient) { }

  add(basket:Basket):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/add",basket)
  }
  delete(basket:Basket):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/delete",basket)
  }
  update(basket:Basket):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/update",basket)
  }
  getBasket():Observable<ListResponseModel<BasketDto>> {
    let newPath = this.apiUrl+"/getalldto";
    return this.httpClient.get<ListResponseModel<BasketDto>>(newPath);
  }
  getBasketByUser(userId:number):Observable<ListResponseModel<BasketDto>> {
    let newPath = this.apiUrl+"/getalldtobyuser?userId="+userId;
    return this.httpClient.get<ListResponseModel<BasketDto>>(newPath);
  }
  
}
