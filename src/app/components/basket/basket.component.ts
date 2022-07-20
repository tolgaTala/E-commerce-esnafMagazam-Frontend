import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { Basket } from 'src/app/models/basket';
import { BasketDto } from 'src/app/models/basketDto';
import { Order } from 'src/app/models/order';
import { OrderDetail } from 'src/app/models/orderDetail';
import { BasketService } from 'src/app/services/basket.service';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  baskets: BasketDto[] = [];  
  qUp: number;
  qDown: number;
  userId = parseInt(localStorage.getItem('userId'));
  buttonDisabled: boolean = false;
  total: number = 0;
  maTtotal: number = 0;
  length: number = 0;
  kargoTutarı:number=11.99
  tempBasket:Basket[]=[]
  
  constructor(
    private basketService: BasketService,
    private toastrService: ToastrService,
    private orderService:OrderService,
    private orderDetailService:OrderDetailService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getBasketsByUser(this.userId);
    console.log(this.userId)
  }

  deleteAllBasket() {
    this.baskets.forEach((element) => {
      this.basketService.delete(element).subscribe((response) => {
        this.toastrService.info(response.message);
        window.location.reload()
      });
      
    });    
  }

  removeBaskets(basket: Basket) {
    this.basketService.delete(basket).subscribe((response) => {
      window.location.reload();
    });
  }

  totalPrice() {
    this.baskets.forEach((element) => {
      this.total += element.quantity * element.price;
    });
    this.maTtotal=this.total
    if(this.total<50){
      this.maTtotal+=this.kargoTutarı
      this.maTtotal=Number(this.maTtotal.toFixed(2))
    }
    
    this.length = this.baskets.length;
  }

  quantityUp(basket: Basket) {
    basket.quantity++;
    this.basketService.update(basket).subscribe((response) => {
      window.location.reload();
    });
  }
  quantityDown(basket: Basket) {
    if (basket.quantity == 2) {
      this.buttonDisabled = true;
    }
    if (basket.quantity == 1) {
      this.buttonDisabled = true;
    } else {
      basket.quantity--;
      this.basketService.update(basket).subscribe((response) => {
        window.location.reload();
      });
    }
  }

  getBasketsByUser(userId: number) {
    this.basketService.getBasketByUser(userId).subscribe((response) => {
      this.baskets = response.data;
      this.tempBasket=this.baskets
      this.totalPrice();
    });
  }
}
