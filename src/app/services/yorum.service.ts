import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/ListResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Yorum } from '../models/yorum';
import { Yorumdto } from '../models/yorumdto';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class YorumService {

  apiUrl = "https://localhost:44312/api/"
  constructor(private httpClient: HttpClient) { }

  getByProductId(productId:number):Observable<ListResponseModel<Yorum>> {
    console.log("getbyproductId "+productId);
    let newPath = this.apiUrl+"comments/getallbyproductid?id="+productId;
    return this.httpClient.get<ListResponseModel<Yorum>>(newPath);
  }
  getById(commentId:number):Observable<SingleResponseModel<Yorum>> {
    let newPath = this.apiUrl+"comments/getbyid?id="+commentId;
    return this.httpClient.get<SingleResponseModel<Yorum>>(newPath);
  }
  getDtoByProductId(productId:number):Observable<ListResponseModel<Yorumdto>> {
    console.log("getbyproductId "+productId);
    let newPath = this.apiUrl+"comments/getdtobyproductid?id="+productId;
    return this.httpClient.get<ListResponseModel<Yorumdto>>(newPath);
  }


  addComment(comment:Yorum):Observable<ResponseModel>{
    let newPath = this.apiUrl+"comments/add";
    return this.httpClient.post<ResponseModel>(newPath,comment);
  }

  


}
