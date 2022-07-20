import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Basket } from 'src/app/models/basket';
import { Favorite } from 'src/app/models/favorite';
import { Product } from 'src/app/models/product';
import { ProductDto } from 'src/app/models/productDto';
import { SellerQustionModel } from 'src/app/models/sellerQuestion';
import { User } from 'src/app/models/user';
import { BasketService } from 'src/app/services/basket.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { ProductService } from 'src/app/services/product.service';
import { SellerQuestionService } from 'src/app/services/seller-question.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  userId: number;
  categoryId:number=0
  products: Product[] = [];
  productsdto: ProductDto[] = [];
  productsDtoTemp:ProductDto[]=[]
  favorities : Favorite[]=[];
  dataLoaded = false;
  filterText: '';
  filter: string = '';
  user: User;
  favored=true
  basket: Basket = { basketId: 0, userId: 0, productId: 0, quantity: 1 };
  baskets: Basket[] = [];

  favorite: Favorite = { favoriteID: 0, userID: 0, productID: 0 };

  minPrice:number=0
  maxPrice:number=0
  sıralamaSecenek:boolean=false;
  artanFiyat:boolean=false;
  azalanFiyat:boolean=false;
  enYeniler:boolean=false


  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private basketService: BasketService,
    private userService: UserService,
    private favoriteService: FavoriteService,
  ) {}

  ngOnInit(): void {
    this.getUserByMail();
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryID']) {
        this.getProductsByCategory(params['categoryID']);
        this.categoryId=params['categoryID']
      } else {
        this.getProductsDto();
      }
    });
    
  }
  getUserByMail() {
    let mail = localStorage.getItem('email');
    this.userService.getIdByMail(mail).subscribe((response) => {
      this.userId = response.data.userId;
      this.getFavorities();
      localStorage.setItem("userId",(this.userId).toString())
    });
  }
  getFavorities() {
    this.favoriteService.getFavorites(this.userId).subscribe(response =>{
      this.favorities = response.data
    });
    
  }

  favorideVarmi(productId:number):boolean{
    if(this.favorities.find(x => x.productID==productId)){
      return true;
    }
    return false;
  }

  addToBasket(productId: number) {
    this.basket.productId = productId;
    this.basket.userId = this.userId;
    if (localStorage.getItem('token')) {
      this.basketService.add(this.basket).subscribe((response) => {
        this.toastrService.success(response.message, 'Başarılı');
      });
    } else {
      this.toastrService.error('önce giriş yapın');
    }
  }

  productsTrue:ProductDto[]=[]
  getProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;

      this.dataLoaded = true;
    });
  }

  getProductsDto() {
    this.productService.getProductsDdto().subscribe((response) => {
      this.productsdto = response.data;
      this.productsTrue=this.productsdto.filter(x=>x.status==true && x.unitInStock>1)
      this.dataLoaded = true;
    });
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
    this.favoriteService
        .getFavorites(this.userId)
        .subscribe((response) => {
          var fav = response.data;
          this.favoriteService.delete(this.favorite).subscribe((response) => {
            this.toastrService.error(response.message, 'Başarılı');
            //window.location.reload();
            this.ngOnInit();
          });
        });
  }  

  getProductsByCategory(categoryID: number) {
    this.productService.getProductsByCategory(categoryID).subscribe((response) => {
        this.productsdto = response.data;
        this.productsTrue = this.productsdto.filter(x=>x.status==true && x.unitInStock>1)
        this.dataLoaded = true;
      });
  }

  getProductsByPrice(minPrice:number,maxPrice:number,categoryId:number,artanFiyat:boolean,azalanFiyat:boolean,enYeniler:boolean) {
    this.productService.getProductsByPrice((minPrice-1),(++maxPrice),categoryId,artanFiyat,azalanFiyat,enYeniler).subscribe((response) => {
      this.productsdto = response.data; 
      this.productsTrue = this.productsdto.filter(x=>x.status==true && x.unitInStock>1)
      console.log(this.productsdto);
    });
  }

  artanFiyatMethod(artanFiyat:boolean){
    this.artanFiyat=true
    this.azalanFiyat=false;
    this.enYeniler=false;

    console.log("artanFiyatMedodu"+artanFiyat)
  }

  azalanFiyatMethod(azalanFiyat:boolean){
    this.azalanFiyat=true;
    this.artanFiyat=false    
    this.enYeniler=false
    console.log("azalanFiyatMethod"+azalanFiyat+this.enYeniler)
  }

  enYenilerMethod(enYeniler:boolean){
    this.enYeniler=true;
    this.artanFiyat=false
    this.azalanFiyat=false;
    console.log(this.enYeniler)
  }


  
}
