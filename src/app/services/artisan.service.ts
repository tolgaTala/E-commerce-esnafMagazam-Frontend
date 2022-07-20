import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EsnafAnswerDto } from '../models/esnafAnswerDto';
import { EsnafDetailsDto } from '../models/esnafDetailsDto';
import { ListResponseModel } from '../models/ListResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ArtisanService {

  apiUrl = "https://localhost:44312/api/artisan/"
  constructor(private httpClient: HttpClient) { 

  }

  getById(id:number):Observable<ListResponseModel<EsnafDetailsDto>> {
    let newPath = this.apiUrl+"getorders?id="+id;
    return this.httpClient.get<ListResponseModel<EsnafDetailsDto>>(newPath);
  }

  getQuastionsById(id:number):Observable<ListResponseModel<EsnafAnswerDto>> {
    let newPath = this.apiUrl+"getquastions?id="+id;
    return this.httpClient.get<ListResponseModel<EsnafAnswerDto>>(newPath);
  }

  getOrdersDtoForAdmin():Observable<ListResponseModel<EsnafDetailsDto>> {
    let newPath = this.apiUrl+"getordersdtoforadmin";
    return this.httpClient.get<ListResponseModel<EsnafDetailsDto>>(newPath);
  }
}
