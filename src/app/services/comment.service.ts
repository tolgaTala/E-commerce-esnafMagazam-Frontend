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
export class CommentService {

  apiUrl = "https://localhost:44312/api/"
  constructor(private httpClient: HttpClient) { }

  getByProductId(productId:number):Observable<ListResponseModel<Yorum>> {
    let newPath = this.apiUrl+"comments/getbyproductid?id="+productId;
    return this.httpClient.get<ListResponseModel<Yorum>>(newPath);
  }
  getById(commentId:number):Observable<SingleResponseModel<Yorum>> {
    let newPath = this.apiUrl+"comments/getbyid?id="+commentId;
    return this.httpClient.get<SingleResponseModel<Yorum>>(newPath);
  }
  getAllDto():Observable<ListResponseModel<Yorumdto>> {
    let newPath = this.apiUrl+"comments/getalldto";
    return this.httpClient.get<ListResponseModel<Yorumdto>>(newPath);
  }
  hidden(List:number[]):Observable<ResponseModel>{
    let newPath=this.apiUrl+"comments/hidden"
    return this.httpClient.post<ResponseModel>(newPath,List)
  }
}
