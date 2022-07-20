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
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit {
  productsdto: ProductDto[] = [];
  favorites: Favorite[] = [];
  basket: Basket = { basketId: 0, userId: 0, productId: 0, quantity: 1 };
  baskets: Basket[] = [];
  userId = localStorage.getItem('userId');
  favorite: Favorite = { favoriteID: 0, productID: 0, userID: 0 };

  constructor(
    private favoriteService: FavoriteService,
    private toastrService: ToastrService,
    private userService: UserService,
    private productService: ProductService,
    private basketService: BasketService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getFavorite(parseInt(this.userId));
  }

  getFavorite(userId: number) {
    this.favoriteService.getFavorites(userId).subscribe((response) => {
      this.favorites = response.data;
      for (let i = 0; i < this.favorites.length; i++) {
        this.productService
          .getProductsDtoById(this.favorites[i].productID)
          .subscribe((response) => {
            this.productsdto[i] = response.data[0];
          });
      }
    });
  }

  addToBasket(productId: number, productName: string) {
    console.log(productId);
    console.log(productName);
    console.log(this.userId);
    this.basket.productId = productId;
    this.basket.userId = parseInt(this.userId);
    if (localStorage.getItem('token')) {
      this.basketService.add(this.basket).subscribe((response) => {
        this.toastrService.success(response.message, 'Başarılı');
      });
    } else {
      this.toastrService.error('önce giriş yapın');
    }
  }

  removeFavorite(productId: number) {   
    
    this.favoriteService.getFavoriteForDelete(parseInt(this.userId),productId).subscribe(response=>{
      this.favorite=response.data
      this.favoriteService.delete(this.favorite).subscribe((response) => {
        this.toastrService.error(response.message, 'Başarılı');
        window.location.reload();
      });
    })

   
  }
  deleteAllFavorite() {
    this.favorites.forEach((element) => {
      this.favoriteService.delete(element).subscribe((response) => {
        this.toastrService.info(response.message);
      });
    });
    window.location.reload();
  }
}