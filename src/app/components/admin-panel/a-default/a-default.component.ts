import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderDetail } from 'src/app/models/orderDetail';
import { ProductDto } from 'src/app/models/productDto';
import { User } from 'src/app/models/user';
import { CommentService } from 'src/app/services/comment.service';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-a-default',
  templateUrl: './a-default.component.html',
  styleUrls: ['./a-default.component.css']
})
export class ADefaultComponent implements OnInit {

  constructor(
    private productService:ProductService,
    private userService:UserService,
    private commentService:CommentService,
    private orderDetailService:OrderDetailService) 
    { }


  productsDto:ProductDto[]=[]
  usersVT:User[]=[]
  customers:User[]=[]
  sellers:User[]=[]
  comments:Comment[]=[]
  orders:OrderDetail[]=[]
  data: any;
  chartOptions: any;

  ngOnInit(): void {
    this.getAllProduct();
    this.getAllOrders()    
    this.getAllUsers() 
  }

  getAllProduct(){
    this.productService.getProductsDdto().subscribe((resposnse)=>{
      this.productsDto=resposnse.data
      this.createData()
    })
  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe((response)=>{
      this.usersVT=response.data;
      this.partitionUsers()
      
    })
  }
  getAllOrders(){
    this.orderDetailService.getAll().subscribe((response)=>{
      this.orders=response.data
      this.createData()
    })
  }

  partitionUsers(){
    this.usersVT.forEach(user => {
      if(user.companyName!=null&&user.taxNo!=null){
        this.sellers.push(user)
      }else{
        this.customers.push(user)
      }
    });
    this.createData()        
  }

  
  createData(){
    this.data = {
      labels: ['Siparişler','Müşteriler','Esnaflar','Ürünler'],
      datasets: [
          {
              data: [this.orders.length,this.customers.length,this.sellers.length,this.productsDto.length],
              backgroundColor: [
                  "#42A5F5",
                  "#66BB6A",
                  "#FFA726",
                  "#DC3545"
              ],
              hoverBackgroundColor: [
                  "#64B5F6",
                  "#81C784",
                  "#FFB74D",
                  "#BB2D3B"
              ]
          }
      ]
  };
  }

}
