import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/ListResponseModel';
import { Category } from '../models/category';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = "https://localhost:44312/api/category/"
  constructor(private httpClient: HttpClient) { }

  getCategories():Observable<ListResponseModel<Category>> {  
    let newPath=this.apiUrl+"getall"  
    return this.httpClient.get<ListResponseModel<Category>>(newPath);
  }

  add(category:Category):Observable<ResponseModel>{
    let newPath = this.apiUrl+"add"
    return this.httpClient.post<ResponseModel>(newPath,category)
  }
}
