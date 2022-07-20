import { LowerCasePipe } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Basket } from 'src/app/models/basket';
import { Favorite } from 'src/app/models/favorite';
import { ProductDto } from 'src/app/models/productDto';
import { BasketService } from 'src/app/services/basket.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-esnaf-magaza',
  templateUrl: './esnaf-magaza.component.html',
  styleUrls: ['./esnaf-magaza.component.css']
})
export class EsnafMagazaComponent implements OnInit {

  constructor(
    private productService:ProductService,
    private activatedRoute: ActivatedRoute,
    private basketService:BasketService,
    private toastrService:ToastrService,    
    private favoriteService: FavoriteService,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => (this.sellerId = params['sellerId'])         
    );    
    this.getProductsDtoBySellerId(this.sellerId) 

  }

  productsDto:ProductDto[]=[] 
  tempProductsDto:ProductDto[]=[] 
  basket: Basket = { basketId: 0, userId: 0, productId: 0, quantity: 1 };
  favored=true
  favorities : Favorite[]=[];
  favorite: Favorite = { favoriteID: 0, userID: 0, productID: 0 };
  userId = parseInt(localStorage.getItem('userId'));
  sellerId:number
  sellerName:string
  filter = '';

  minPrice:number=0
  maxPrice:number=0
  sıralamaSecenek:boolean=false;
  artanFiyat:boolean=false;
  azalanFiyat:boolean=false;
  enYeniler:boolean=false

  clickMain:boolean=true;
  clickAll=false;

  getProductsDtoBySellerId(sellerId:number) {
    this.productService.getProductsDtoBySellerId(sellerId).subscribe((response) => {
      this.productsDto = response.data;
      this.tempProductsDto=this.productsDto
      this.sellerName=this.productsDto[0].userCompany
      console.log(this.productsDto[0].userCompany);    
      this.getFavorities();  
    });
  }

  onKey(event: any) {
    let filterText = event.target.value;
    this.filter=filterText
    localStorage.setItem('filterText', filterText);
  }
  search() {
    if (this.filter == '') {
      localStorage.removeItem('filterText');
    }
    //window.location.reload()
    this.ngOnInit();
  }

  artanFiyatMethod(artanFiyat:boolean){
    this.artanFiyat=true
    this.azalanFiyat=false;
    this.enYeniler=false;
  }

  azalanFiyatMethod(azalanFiyat:boolean){
    this.azalanFiyat=true;
    this.artanFiyat=false    
    this.enYeniler=false
  }

  enYenilerMethod(enYeniler:boolean){
    this.enYeniler=true;
    this.artanFiyat=false
    this.azalanFiyat=false;
  }

  getProductsByPrice(minPrice:number,maxPrice:number,artanFiyat:boolean,azalanFiyat:boolean,enYeniler:boolean) {
    this.productService.getProductsByPrice((minPrice),(maxPrice),0,artanFiyat,azalanFiyat,enYeniler).subscribe((response) => {
      this.productsDto = response.data;
      this.productsDto=this.productsDto.filter(x=>x.userId==this.sellerId); 
    });
  }

  addToBasket(productId: number) {
    this.basket.productId = productId;
    this.basket.userId = this.userId;
    this.basket.quantity=1
    if (localStorage.getItem('token')) {
      this.basketService.add(this.basket).subscribe((response) => {
        this.toastrService.success(response.message, 'Başarılı');
      });
    } else {
      this.toastrService.error('önce giriş yapın');
    }
  }

  
  getFavorities() {
    this.favoriteService.getFavorites(this.userId).subscribe(response =>{
      this.favorities = response.data
      console.log(this.favorities)
    });
    
  }

  favorideVarmi(productId:number):boolean{
    if(this.favorities.find(x => x.productID==productId)){
      return true;
    }
    return false;
  }

  addToFavorite(productId:number) {
    this.favorite.productID =productId;
    this.favorite.userID = this.userId;
    if (this.favored == true) {
      if (localStorage.getItem('token')) {
        this.favoriteService.add(this.favorite).subscribe((response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.favored = false;
          window.location.reload();
          //this.ngOnInit();
        });
      } else {
        this.toastrService.error('önce giriş yapın');
      }
    } 
  }

  deleteToFavorite(productId:number){   
    this.favorities.forEach(fav => {
      if(fav.userID==this.userId &&fav.productID==productId){
        this.favorite=fav 
      }
    });
    this.favoriteService.getFavorites(this.userId).subscribe((response) => {
          var fav = response.data;
          this.favoriteService.delete(this.favorite).subscribe((response) => {
            this.toastrService.error(response.message, 'Başarılı');
            window.location.reload();
            //this.ngOnInit();
          });
        })
  }

  openMain(){
    if(this.clickMain){
      return 'ss-tab ss-tab-active'
    }else{
      return 'ss-tab'
    }    
  }
  openAll(){   
    if(this.clickAll){
      return 'ss-tab ss-tab-active'
    }else{
      return 'ss-tab'
    } 
  }
  doOpenAll(){
    this.clickMain=false;
    this.clickAll=true;
    localStorage.removeItem('filterText');
    this.ngOnInit()
  }
  doOpenMain(){
    this.clickMain=true;
    this.clickAll=false;
  }

}
