import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup,  FormControl,  Validators, FormBuilder, } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address';
import { Basket } from 'src/app/models/basket';
import { BasketDto } from 'src/app/models/basketDto';
import { Order } from 'src/app/models/order';
import { OrderDetail } from 'src/app/models/orderDetail';
import { OrderDetailsDto } from 'src/app/models/orderDetailsDto';
import { Payment } from 'src/app/models/payment';
import { AddressService } from 'src/app/services/address.service';
import { BasketService } from 'src/app/services/basket.service';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(    
    private basketService: BasketService,
    private toastrService: ToastrService,
    private orderService:OrderService,
    private orderDetailService:OrderDetailService,    
    private formBuilder: FormBuilder,
    private paymentService:PaymentService,
    private addressService:AddressService,
    private modalService: BsModalService,
  ) { }


  userId=parseInt(localStorage.getItem("userId"))
  yeniOrderId:number

  baskets:BasketDto[]=[]
  orderDetail:OrderDetail[]=[]
  postOrderDetail:OrderDetail[]=[]
  tempOrderId:number=0
  tempBasket:Basket[]=[]
  orderDetailByUserId:OrderDetailsDto[]=[]
  addresses: Address[];
  adress:Address;
  adres1 = true;
  odeme1 = false;

  total: number = 0;
  maTtotal: number = 0;
  length: number = 0;

  payments:Payment[]=[]
  paymentForm:FormGroup
  kargoTutarı:number=11.99

  addressControl=false;
  
  modalRef?: BsModalRef;


  addressForm:FormGroup

  ngOnInit(): void {
    this.getBasketsByUser(this.userId);    
    this.createPaymentForm()
    this.getAddresses();
    this.createAddressForm()
    console.log(this.userId)
  }

  getAddresses() {
    this.addressService.getByUserId(this.userId).subscribe((response) => {
      this.addresses = response.data;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  OrderDetailAdd(){
    this.baskets.forEach(item => {
      let orderDetail:OrderDetail=new OrderDetail();  
        orderDetail.productId=item.productId;
        orderDetail.quantity=item.quantity
        orderDetail.price=item.price * item.quantity
        orderDetail.orderId=this.yeniOrderId;
        this.postOrderDetail.push(orderDetail)                   
    });
      
    console.log("order detailse eklendi"); 
      this.orderDetailService.OrderDetailAdd(this.postOrderDetail).subscribe((response)=>{
    });

  }

  deleteAllBasket() {
    this.baskets.forEach((element) => {
      this.basketService.delete(element).subscribe((response) => {        
      });      
    });  
    this.toastrService.error("Sepetten Kaldırıldı");  
  }

 
  getOrderDetailsByUserId(userId:number){
    console.log(userId)
    this.orderDetailService.getOrderDetailsDtoByUserId(userId).subscribe((response)=>{
      this.orderDetailByUserId=response.data
      for (let index = 0; index < this.orderDetailByUserId.length; index++) {
        console.log(this.orderDetailByUserId[index])
        
      }
    })
    
  }

  //ödeme
  getAllPayments(){
    this.paymentService.PaymentGetAll().subscribe((response)=>{
      this.payments=response.data
      // this.payments.forEach(element => {
      //   console.log(element)
      // });
    })
  }

  createAddressForm(){
    this.addressForm=this.formBuilder.group({
      userId: [this.userId, Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      addressHead: ["", Validators.required],      
      phoneNumber: ['', Validators.required],
      street: ["", Validators.required],
      addressDetail: ["", Validators.required],
      amount: [this.maTtotal, Validators.required],
      
    });
    console.log("form",this.maTtotal)
  }


  OrderAddF(){
    console.log(this.addressForm.value)
    this.addressForm.value.amount=this.maTtotal
      console.log("boş değil")     
       
      let addressModel = Object.assign({},this.addressForm.value)
      console.log(addressModel);
      
      this.orderService.OrderAdd(addressModel).subscribe((response)=>{
        this.yeniOrderId=response.data
        this.OrderDetailAdd();
        this.deleteAllBasket();
        this.PaymentsAdd()
        this.toastrService.success("Sipariş Alındı")
        window.location.assign("/hesabim/siparislerim")
      })
  

  }

 

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      expirationMonth: ['', Validators.required],
      expirationYear: ['', Validators.required],
      cvv: ['', Validators.required],
      cardHolder: ['', Validators.required],
      userId: [this.userId, Validators.required],
    });
  }

  PaymentsAdd(){
    console.log(this.paymentForm.value)
      console.log("boş değil")
      let paymentModel = Object.assign({},this.paymentForm.value)
      this.paymentService.PaymentAdd(paymentModel).subscribe((response)=>{
        this.toastrService.success("Ödeme Başarılı")
      })

  }


  adres() {
    this.adres1 = true;
    this.odeme1 = false;
  }//adres bilgileri dolu ise ödeme ekranına geçer
  odeme() {
      this.odeme1 = true;
      this.adres1 = false;         
  }

  doActiveAdres() {
    if (this.adres1) {
      return 'active';
    } else return '';
  }
  doActiveOdeme() {
    if (this.odeme1) {
      return 'active';
    } else return '';
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

  //sepetten ürünleri silmek için sepetteki ürünleri getiriyor deleteBasket de bunlar siliniyor
  getBasketsByUser(userId: number) {
    this.basketService.getBasketByUser(userId).subscribe((response) => {      
      this.baskets = response.data;
      this.tempBasket=this.baskets
      this.totalPrice();
    });
  }

  
  //adres bilgilerinin kontrolü
  AddressControl(){
    if(this.addressForm.valid){
      this.modalRef?.hide()
      if (this.addressForm.valid) {      
        let addressModel = Object.assign({}, this.addressForm.value);
        addressModel.userId = this.userId;
        this.addressService.add(addressModel).subscribe((response) => {
          this.toastrService.success(response.message);
          this.ngOnInit();
        });
      } else {
        this.toastrService.error('Boş bırakmayınız');
      }
      this.odeme()
    }else{
      this.toastrService.error("Lütfen Boş Bırakmayın!")
    }
  }


  PaymentControl(){
    if(this.paymentForm.valid){
      this.OrderAddF()
    }else{
      this.toastrService.error("Lütfen Boş Bırakmayın!")
    }
  }

  takeAddressInfo(addressId:number){
    this.addressService.getById(addressId).subscribe((datam) => {
      this.adress = datam.data;
      this.addressForm.value.userId=this.adress.userId;
      this.addressForm.value.addressDetail=this.adress.addressDetail;
      this.addressForm.value.addressHead=this.adress.addressHead;
      this.addressForm.value.firstName=this.adress.firstName;
      this.addressForm.value.lastName=this.adress.lastName;
      this.addressForm.value.phoneNumber=this.adress.phoneNumber;
      this.addressForm.value.street=this.adress.street;
      
      this.odeme1=true
      this.odeme();
  });
}
  
}