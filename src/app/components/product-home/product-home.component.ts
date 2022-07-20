import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Basket } from 'src/app/models/basket';
import { Favorite } from 'src/app/models/favorite';
import { ProductDto } from 'src/app/models/productDto';
import { BasketService } from 'src/app/services/basket.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css'],
})
export class ProductHomeComponent implements OnInit {

  responsiveOptions:any;
  responsiveOptionsGalleria:any;
  constructor
  (private productService:ProductService,
    private activatedRoute: ActivatedRoute,
    private basketService:BasketService,
    private toastrService:ToastrService,    
    private favoriteService: FavoriteService,
    private userService:UserService,
    ) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];

    this.responsiveOptionsGalleria = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];
   }

  productsDto: ProductDto[] = [];
  productsDtoTemp: ProductDto[] = [];
  productsDtoNew: ProductDto[] = [];
  productsDtoFav: ProductDto[] = [];
  productsDtoStr:ProductDto[]=[]
  productsTrue:ProductDto[]=[]

  basket: Basket = { basketId: 0, userId: 0, productId: 0, quantity: 1 };
  favored=true
  favorities : Favorite[]=[];
  favorite: Favorite = { favoriteID: 0, userID: 0, productID: 0 };
  userId:number=0
  sellerId:number
  sellerName:string
  filter = '';

  ngOnInit(): void {
    this.getUserByMail()
    this.getProductsDto()
  }

  getUserByMail() {
    let mail = localStorage.getItem('email');
    this.userService.getIdByMail(mail).subscribe((response) => {
      this.userId = response.data.userId;
      this.getFavorities();
      localStorage.setItem("userId",(this.userId).toString())
    });
  }

  getProductsDto() {
    this.productService.getProductsDdto().subscribe((response) => {
      this.productsDto = response.data;
      this.productsDto=this.productsDto.filter(x=>x.status==true && x.unitInStock>1)
      this.productsDtoTemp=response.data
      this.getProductsNewAdded()
      this.getProductsBestFav()
    });
  }
  getProductsNewAdded(){
    this.productsDtoNew = this.productsDto.sort((a,b) => (a.addedTime < b.addedTime) ? 1 : ((b.addedTime < a.addedTime) ? -1 : 0))
  }
  getProductsBestFav(){
    this.productsDtoFav = this.productsDto.sort((a,b) => (a.likeNumber < b.likeNumber) ? 1 : ((b.likeNumber < a.likeNumber) ? -1 : 0))
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
}
