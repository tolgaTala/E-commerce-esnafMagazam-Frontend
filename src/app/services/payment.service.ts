import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/ListResponseModel';
import { Payment } from '../models/payment';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {


  apiUrl = "https://localhost:44312/api/payments/"


  constructor(private httpClient: HttpClient) { 
    
  }

  PaymentAdd(payment:Payment){
    return this.httpClient.post(this.apiUrl+ "add",payment)
  }
  PaymentGetAll(){
    return this.httpClient.get<ListResponseModel<Payment>>(this.apiUrl+ "getall")
  }
}
