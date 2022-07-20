import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/ListResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "https://localhost:44312/api/users/"
  constructor(private httpClient:HttpClient) { }

  getIdByMail(email:string):Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl+"getbymail?email="+email;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  update(user:User):Observable<ResponseModel>{
    console.log("serviste",user);
    let newPath =this.apiUrl+"update";
    return this.httpClient.post<ResponseModel>(newPath,user);

  }

  hidden(list:number[]):Observable<ResponseModel>{
    let newPath =this.apiUrl+"hidden";
    return this.httpClient.post<ResponseModel>(newPath,list);

  }
  delete(user:User):Observable<ResponseModel>{
    let newPath =this.apiUrl+"delete";
    return this.httpClient.post<ResponseModel>(newPath,user);

  }
  changePwd(userId:number,oldPwd:string,newPwd:string):Observable<ResponseModel>{
    let newPath=this.apiUrl +"changepwd?userId="+userId+"&oldpwd="+oldPwd+"&newpwd="+newPwd;
    return this.httpClient.post<ResponseModel>(newPath,null);
  }
  getById(id:number):Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl+"getbyid?id="+id;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
  getForAdmin():Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl+"getforadmin";
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
  getAllUsers():Observable<ListResponseModel<User>>{
    let newPath = this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<User>>(newPath)
  }
}