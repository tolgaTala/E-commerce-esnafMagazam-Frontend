import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../models/address';
import { ListResponseModel } from '../models/ListResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  apiUrl = "https://localhost:44312/api/addresses/"
  constructor(private httpClient: HttpClient) { 
    
   }
   add(adress:Address):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",adress)
  }
   update(address:Address):Observable<ResponseModel>{
    let newPath =this.apiUrl+"update";
    return this.httpClient.post<ResponseModel>(newPath,address);

  }
  delete(addressId:number):Observable<ResponseModel>{
    let newPath =this.apiUrl+"delete?addressId="+addressId;
    return this.httpClient.post<ResponseModel>(newPath,addressId);

  }
  getById(id:number):Observable<SingleResponseModel<Address>> {
    let newPath = this.apiUrl+"getbyid?addressId="+id;
    return this.httpClient.get<SingleResponseModel<Address>>(newPath);
  }
  getByUserId(id:number):Observable<ListResponseModel<Address>> {
    let newPath = this.apiUrl+"getbyuserid?userId="+id;
    return this.httpClient.get<ListResponseModel<Address>>(newPath);
  }
}