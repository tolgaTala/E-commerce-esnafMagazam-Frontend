import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/ListResponseModel';
import { OrderDetail } from '../models/orderDetail';
import { OrderDetailsDto } from '../models/orderDetailsDto';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  apiUrl = "https://localhost:44312/api/orderdetails/"
  constructor(private httpClient: HttpClient) { }

  OrderDetailAdd(orderdetail:OrderDetail[]){
    let newPath=this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newPath,orderdetail)
  }

  getOrderDetailsDtoByUserId(userId:number):Observable<ListResponseModel<OrderDetailsDto>>{
    return this.httpClient.get<ListResponseModel<OrderDetailsDto>>(this.apiUrl+"getorderdetailbyuserid?id="+userId)
  }

  getOrderDetailsByOrderId(orderId:number):Observable<ListResponseModel<OrderDetail>>{
    return this.httpClient.get<ListResponseModel<OrderDetail>>(this.apiUrl+"getodbyorderid?id="+orderId)
  }

  checkBuyOrder(productID:number,userID:number):Observable<ListResponseModel<OrderDetailsDto>>{
    let newPath=this.apiUrl+"checkbuyorder?productId="+productID+"&userId="+userID
    console.log(newPath)
    return this.httpClient.get<ListResponseModel<OrderDetailsDto>>(newPath)

  }

  getOrderDetailsDtoByOrderId(orderId:number){
    let newPath=this.apiUrl+"getorderdtobyorderid?id="+orderId
    return this.httpClient.get<ListResponseModel<OrderDetailsDto>>(newPath)

  }
  getAll():Observable<ListResponseModel<OrderDetail>>{
    let newPath = this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<OrderDetail>>(newPath)
  }

  getOrderById(orderId:number,productId:number):Observable<SingleResponseModel<OrderDetail>>{
    console.log("fsdssdfsdfsdfsdffsdfdsf");
    
    return this.httpClient.get<SingleResponseModel<OrderDetail>>(this.apiUrl+"getorderbyorderid?id="+orderId+"&productId="+productId)
  }

  OrderDetailUpdate(orderDetail:OrderDetail):Observable<ResponseModel>{
    let newPath =this.apiUrl+"update";
    return this.httpClient.post<ResponseModel>(newPath,orderDetail);
  }
}
