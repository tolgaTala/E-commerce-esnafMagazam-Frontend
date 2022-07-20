import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favorite } from '../models/favorite';
import { ListResponseModel } from '../models/ListResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  apiUrl = "https://localhost:44312/api/favorites"
  constructor(private httpClient: HttpClient) { }

  add(favorite:Favorite):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/add",favorite)
  }
  delete(favorite:Favorite):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/delete",favorite)
  }
  update(favorite:Favorite):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/update",favorite)
  }
  getFavorites(userId:number):Observable<ListResponseModel<Favorite>> {
    let newPath = this.apiUrl+"/getall?userId="+userId;
    return this.httpClient.get<ListResponseModel<Favorite>>(newPath);
  }
  getFavoriteForDelete(userId:number,productId:number):Observable<SingleResponseModel<Favorite>> {
    let newPath = this.apiUrl+"/getfavorifordelete?userId="+userId+"&productId="+productId;
    return this.httpClient.get<SingleResponseModel<Favorite>>(newPath);
  }
}