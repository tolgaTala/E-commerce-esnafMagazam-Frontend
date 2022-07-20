import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderDetailsDto } from 'src/app/models/orderDetailsDto';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderId:string
  ordersDto:OrderDetailsDto[]=[]
  order:Order


  constructor(
    private activatedRoute: ActivatedRoute,
    private orderDetailService:OrderDetailService,
    private orderService:OrderService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => (this.orderId = params['orderId'])       
    );   
    
    console.log("parametre",this.orderId)
    this.getOrderDetailDtoByOrderId(parseInt(this.orderId))
    this.getOrdersByOrderId(parseInt(this.orderId))
    
  }

  getOrderDetailDtoByOrderId(orderId:number){
    this.orderDetailService.getOrderDetailsDtoByOrderId(orderId).subscribe((response)=>{
      this.ordersDto=response.data
      console.log("orders",this.ordersDto)
      
    })
  }

  getOrdersByOrderId(orderId:number){
    this.orderService.getOrdersByOrderId(orderId).subscribe((response)=>{
      this.order=response.data
      console.log("order",this.order)
    })
  }


}
