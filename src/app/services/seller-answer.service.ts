import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/ListResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SellerAnswerModel } from '../models/sellerAnswer';

@Injectable({
  providedIn: 'root'
})
export class SellerAnswerService {
  
  apiUrl = "https://localhost:44312/api/selleranswers/"
  constructor(private httpClient: HttpClient) { }

  getAllAnswerByQuestionId(questionId:number):Observable<ListResponseModel<SellerAnswerModel>> {
    let newPath = this.apiUrl+"getallbyqid?id="+questionId;
    return this.httpClient.get<ListResponseModel<SellerAnswerModel>>(newPath);
  }

  getAllAnswer():Observable<ListResponseModel<SellerAnswerModel>>{
    let newPath=this.apiUrl+"getall";
    return this.httpClient.get<ListResponseModel<SellerAnswerModel>>(newPath);
  }

  addAnswer(sellerAnswer:SellerAnswerModel):Observable<ResponseModel> {
    let newPath = this.apiUrl+"add";
    console.log(newPath)
    return this.httpClient.post<ResponseModel>(newPath,sellerAnswer);
  }

}
