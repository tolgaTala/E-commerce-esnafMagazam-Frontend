import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ListResponseModel } from '../models/ListResponseModel';
import { ResponseModel } from '../models/responseModel';
import { ProductDto } from '../models/productDto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = "https://localhost:44312/api/"
  constructor(private httpClient: HttpClient) { 

  }

  getProducts():Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl+"products/getall";
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }
  getProductsDdto():Observable<ListResponseModel<ProductDto>> {
    let newPath = this.apiUrl+"products/getalldto";
    return this.httpClient.get<ListResponseModel<ProductDto>>(newPath);
  }
  getProductsByCategory(categoryID:number):Observable<ListResponseModel<ProductDto>> {
    let newPath = this.apiUrl+"products/getallbycategoryid?id="+categoryID;
    return this.httpClient.get<ListResponseModel<ProductDto>>(newPath);
  }
  getProductsDtoById(productId:number):Observable<ListResponseModel<ProductDto>> {
    let newPath = this.apiUrl+"products/getbyid?id="+productId;
    return this.httpClient.get<ListResponseModel<ProductDto>>(newPath);
  }

  add(product:any):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"products/add",product)
  }

  update(product:any):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"products/update",product)
  }
  updateWithImage(product:any):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"products/updateImage",product)
  }

  starUpdate(productId:number,starRating:number):Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>(this.apiUrl+"products/starupdate?id="+productId+"&&star="+starRating)
  }

  getProductsByPrice(minPrice:number,maxPrice:number,categoryId:number,artanFiyat:boolean,azalanFiyat:boolean,enYeniler:boolean):Observable<ListResponseModel<ProductDto>> {
    if(categoryId!=0){
      let newPath = this.apiUrl+"products/getproductsdtobyfilter?min="+minPrice+"&max="+maxPrice+"&id="+categoryId+"&artanFiyat="+artanFiyat+"&azalanFiyat="+azalanFiyat+"&enyeniler="+enYeniler;
      return this.httpClient.get<ListResponseModel<ProductDto>>(newPath);
    }else{let newPath = this.apiUrl+"products/getproductsdtobyfilter?min="+minPrice+"&max="+maxPrice+"&artanFiyat="+artanFiyat+"&azalanFiyat="+azalanFiyat+"&enyeniler="+enYeniler;
    console.log(newPath)  
    return this.httpClient.get<ListResponseModel<ProductDto>>(newPath);
    }    
  }

  getProductsDtoBySellerId(userId:number):Observable<ListResponseModel<ProductDto>> {
    let newPath = this.apiUrl+"products/getdtobysellerid?id="+userId;
    return this.httpClient.get<ListResponseModel<ProductDto>>(newPath);
  }

  hidden(list:number[]):Observable<ResponseModel>{
    console.log("serviste ",list);    
    return this.httpClient.post<ResponseModel>(this.apiUrl+"products/hidden",list)
  }

  suspendProduct(productId:number):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"products/deleteid?id="+productId,null)
  }
  retrieveProduct(productId:number):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"products/retrieve?id="+productId,null)
  }

  updateForSell(productId:number,quantity:number):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"products/updateforsell?productId="+productId+"&quantity="+quantity,null)
  }

  updateStok(productID:number,newStok:number):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"products/updatestok?id="+productID+"&stok="+newStok,null)
  }
}
