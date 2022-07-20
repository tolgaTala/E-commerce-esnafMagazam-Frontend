import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/ListResponseModel';
import { QuestionAndAnswerDtoModel } from '../models/questionAndAnswerDto';
import { ResponseModel } from '../models/responseModel';
import { SellerQustionModel } from '../models/sellerQuestion';

@Injectable({
  providedIn: 'root'
})
export class SellerQuestionService {

  apiUrl = "https://localhost:44312/api/sellerquestion/"
  constructor(private httpClient: HttpClient) { }


  getQuestions():Observable<ListResponseModel<SellerQustionModel>> {
    let newPath = this.apiUrl+"getall";
    return this.httpClient.get<ListResponseModel<SellerQustionModel>>(newPath);
  }

  addQuestion(sellerQuestion:SellerQustionModel):Observable<ResponseModel> {
    let newPath = this.apiUrl+"add";
    console.log(newPath)
    return this.httpClient.post<ResponseModel>(newPath,sellerQuestion);
  }

  getAllQuestionByProductId(productId:number):Observable<ListResponseModel<SellerQustionModel>> {
    let newPath = this.apiUrl+"getallbyproductid?id="+productId;
    return this.httpClient.get<ListResponseModel<SellerQustionModel>>(newPath);
  }

  getAllQuestionsDto():Observable<ListResponseModel<QuestionAndAnswerDtoModel>> {
    let newPath = this.apiUrl+"getalldto";
    return this.httpClient.get<ListResponseModel<QuestionAndAnswerDtoModel>>(newPath);
  }
}
