import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { EsnafDetailsDto } from 'src/app/models/esnafDetailsDto';
import { OrderDetail } from 'src/app/models/orderDetail';
import { ArtisanService } from 'src/app/services/artisan.service';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { OrderDetailComponent } from '../../order-detail/order-detail.component';

@Component({
  selector: 'app-a-orders',
  templateUrl: './a-orders.component.html',
  styleUrls: ['./a-orders.component.css'],
  providers:[ConfirmationService]
})
export class AOrdersComponent implements OnInit {

  modalRef?: BsModalRef;
  constructor(
    private artisanService:ArtisanService,
    private orderDetailService:OrderDetailService,
    private confirmationService: ConfirmationService,
    private formBuilder:FormBuilder,
    private modalService: BsModalService,
    private toastrService:ToastrService
  ) { }

  first = 0;
  rows = 6;
  artisansOrders:EsnafDetailsDto[]=[]
  orderDetail:OrderDetail
  ngOnInit(): void {
    this.getArtisansOrders()
  }

  getArtisansOrders(){
    this.artisanService.getOrdersDtoForAdmin().subscribe(response=>{
      this.artisansOrders = response.data
    })
  }

  orderComplete(orderId:number,productId:number){
    this.orderDetailService.getOrderById(orderId,productId).subscribe(response=>{
     this.orderDetail=response.data
     this.orderDetail.status=true
     this.orderDetailService.OrderDetailUpdate(this.orderDetail).subscribe(data=>{
       this.toastrService.info("Sipariş gönderildi")
       this.ngOnInit();
     })
    })
 }

}
