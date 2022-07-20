import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { OrderResponseModel } from '../models/orderResponseModel';
import { ListResponseModel } from '../models/ListResponseModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = "https://localhost:44312/api/orders/"
  constructor(private httpClient: HttpClient) { 

  }

  OrderAdd(order:Order):Observable<OrderResponseModel> {
    console.log("order serviste")
    let newPath = this.apiUrl+"add";
    return this.httpClient.post<OrderResponseModel>(newPath,order);
  }

  GetAllByUser(userId:number):Observable<ListResponseModel<Order>> {
    console.log("order serviste")
    let newPath = this.apiUrl+"getallbyuser?id="+userId;
    return this.httpClient.get<ListResponseModel<Order>>(newPath);
  }
  

  getOrdersByOrderId(orderId:number){
    let newPath=this.apiUrl+"getorderbyorderid?id="+orderId
    return this.httpClient.get<SingleResponseModel<Order>>(newPath)
  }

  getAll():Observable<ListResponseModel<Order>>{
    let newPath = this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<Order>>(newPath)
  }
}
