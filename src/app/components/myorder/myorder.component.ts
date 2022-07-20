import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderDetail } from 'src/app/models/orderDetail';
import { OrderDetailsDto } from 'src/app/models/orderDetailsDto';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {

  userId=parseInt(localStorage.getItem("userId"))
  orders:Order[]=[]
  orderDetails:OrderDetail[]=[]
  orderDetailsDto:OrderDetailsDto[]=[]

  constructor(
    private orderService:OrderService,
    private orderDetailService:OrderDetailService
  ) { }

  ngOnInit(): void {
    console.log("myorder")
    console.log(this.userId)
    this.getOrderByUserId(this.userId)   
    this.getOrderDetailsByUserId(this.userId)   
  }


  getOrderByUserId(userId:number){
    this.orderService.GetAllByUser(userId).subscribe((response)=>{
      this.orders=response.data
      this.orders=this.orders.sort((a,b) => (a.orderDate < b.orderDate) ? 1 : ((b.orderDate < a.orderDate) ? -1 : 0))
      console.log(this.orders)
    })
  }

  // getOrderDetailsByOrderId(orderId:number){
  //   this.orderDetailService.getOrderDetailsByUserId(orderId).subscribe((response)=>{
  //     this.orderDetails=response.data
  //     console.log(this.orderDetails)
  //   })
  // }

  getOrderDetailsByUserId(userId:number){
    this.orderDetailService.getOrderDetailsDtoByUserId(userId).subscribe((response)=>{
      this.orderDetailsDto=response.data
      console.log(this.orderDetailsDto)
    })
  }

  getOrderDetailsByOrderId(orderId:number){
    return this.orderDetailsDto.filter(x=> x.orderId == orderId);
  }

  

}
