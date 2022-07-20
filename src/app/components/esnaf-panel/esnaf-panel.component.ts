import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { EsnafAnswerDto } from 'src/app/models/esnafAnswerDto';
import { EsnafDetailsDto } from 'src/app/models/esnafDetailsDto';
import { OrderDetail } from 'src/app/models/orderDetail';
import { Product } from 'src/app/models/product';
import { ProductDto } from 'src/app/models/productDto';
import { User } from 'src/app/models/user';
import { ArtisanService } from 'src/app/services/artisan.service';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { ProductService } from 'src/app/services/product.service';
import { SellerAnswerService } from 'src/app/services/seller-answer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-esnaf-panel',
  templateUrl: './esnaf-panel.component.html',
  styleUrls: ['./esnaf-panel.component.css'],
  providers:[ConfirmationService]
})
export class EsnafPanelComponent implements OnInit {
  modalRef?: BsModalRef;
  selectedFile: File;

  warning = "!"
  newStok:number
  productidstr:string
  productIdTemp:number
  userId = parseInt(localStorage.getItem('userId'));
  sellerName:string
  productsDto:ProductDto[]=[] 
  productsTrue:ProductDto[]=[] 
  productsFalse:ProductDto[]=[] 
  clickMain:boolean=true;
  clickAll=false;
  clickAdd=false
  clickComplete=false
  clickWaiting=false
  clickStoks=false
  clickQuastions=false
  user:User;
  statusTrue=true;
  statusFalse=false;
  statusCheck=true
  productUpdateForm :FormGroup
  yedekProduct:ProductDto
  artisansOrders:EsnafDetailsDto[]=[]
  artisansOrdersTrue:EsnafDetailsDto[]=[]
  artisansOrdersFalse:EsnafDetailsDto[]=[]
  orderDetail:OrderDetail

  esnafAnswerDto:EsnafAnswerDto[]=[]

  first = 0;
  rows = 6;
  products:ProductDto[]=[]
  product:ProductDto
  selectedProducts:ProductDto[]=[]
  list:number[]=[]
  statuses: any[];
  selectedStatus:string
  loading:boolean

  constructor(private productService:ProductService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService,     
    private userService:UserService ,
    private formBuilder:FormBuilder, 
    private modalService: BsModalService,
    private artisanService:ArtisanService,
    private confirmationService:ConfirmationService,
    private orderDetailService:OrderDetailService,
    private sellerAnswerService:SellerAnswerService ) { }

  ngOnInit(): void {
    this.getUserByMail();
    this.getArtisansOrders();
    this.getProductsDtoBySellerId(this.userId)
    this.getQuastionsBySellerId(this.userId)
    
  }

  getArtisansOrders(){
    this.artisanService.getById(this.userId).subscribe(response=>{
      this.artisansOrders = response.data
    })
  }
  
  updateStok(productId:number){
    this.productService.updateStok(productId,this.newStok).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı")
      window.location.reload()
    })
  }

  updateProduct() {
    if (this.productUpdateForm.valid) {
      const formData = new FormData();
      formData.append('productID', this.yedekProduct.productId.toString());
      formData.append('userId', this.userId.toString());
      formData.append('productName', this.productUpdateForm.get('productName').value);
      formData.append('price', this.productUpdateForm.get('price').value);
      formData.append('unitInStock', this.productUpdateForm.get('unitInStock').value);
      formData.append('categoryId', this.yedekProduct.categoryId.toString());
      formData.append('status',this.yedekProduct.status.toString());
      formData.append('likeNumber', this.yedekProduct.likeNumber.toString());
      formData.append('productDescription', this.productUpdateForm.get('productDescription').value);
      formData.append('imagePath', this.yedekProduct.imagePath);
      if(this.selectedFile){
        formData.append(
          'Image',this.selectedFile,this.selectedFile.name
        );
        this.productService.updateWithImage(formData).subscribe((response) => {
          this.toastrService.success(response.message);
          this.modalRef?.hide()
          this.ngOnInit()
        });
      }
      else{
        this.productService.update(formData).subscribe((response) => {
          this.toastrService.success(response.message);
          this.modalRef?.hide()
          this.ngOnInit()
        });
      }
      
    }else{
      this.toastrService.error("Lütfen Boş Bırakmayın")
    }
  }

  createProductUpdateForm(product:ProductDto) {
    this.productUpdateForm = this.formBuilder.group({
      productName: [product.productName, Validators.required],
      price: [product.price, Validators.required],
      unitInStock: [product.unitInStock, Validators.required],
      categoryId: [product.categoryId, Validators.required],
      image: [product.imagePath],
      status:[product.status],
      likeNumber:[product.likeNumber],
      productDescription:[product.productDescription],
      userId: [this.userId],
    });
  }

  openModal(template: TemplateRef<any>,product:ProductDto) {
    this.createProductUpdateForm(product);
    this.yedekProduct=product    
    this.modalRef = this.modalService.show(template);
  }

  onFileSelected(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.selectedFile = <File>event.target.files[i];
      const file = (event.target as HTMLInputElement).files[i];
      this.productUpdateForm.patchValue({
        imagePath: file,
      });
      this.productUpdateForm.get('image').updateValueAndValidity();
    }
  }

  getUserByMail() {
    let mail = localStorage.getItem('email');
    this.userService.getIdByMail(mail).subscribe((response) => {
      this.user=response.data
      this.sellerName=this.user.companyName      
    });
  }

  getProductsDtoBySellerId(sellerId:number) {
    this.productService.getProductsDtoBySellerId(this.userId).subscribe((response) => {
      this.productsDto = response.data; 
      this.productsTrue=this.productsDto.filter(x=>x.status==true)
      this.productsFalse=this.productsDto.filter(x=>x.status==false)
    });
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
  classWaiting(){   
    if(this.clickWaiting){
      return 'ss-tab ss-tab-active'
    }else{
      return 'ss-tab'
    } 
  }
  classStoks(){   
    if(this.clickStoks){
      return 'ss-tab ss-tab-active'
    }else{
      return 'ss-tab'
    } 
  }
  classComplete(){   
    if(this.clickComplete){
      return 'ss-tab ss-tab-active'
    }else{
      return 'ss-tab'
    } 
  }
  openProductAdd(){
    if(this.clickAdd){
      return 'ss-tab ss-tab-active'
    }else{
      return 'ss-tab'
    } 
  }
  classQuastions(){
    if(this.clickQuastions){
      return 'ss-tab ss-tab-active'
    }else{
      return 'ss-tab'
    } 
  }
  doAdd(){
    this.clickMain=false;
    this.clickAll=false;
    this.clickAdd=true
    this.clickComplete=false
    this.statusTrue=false
    this.clickStoks=false
    this.statusFalse=false
    this.clickWaiting=false
    this.clickQuastions=false
  }
  showTrueProducts(){
    // this.statusCheck=true
    this.statusTrue=true
    this.statusFalse=false
    this.clickMain=true;
    this.clickAll=false;
    this.clickAdd=false
    this.clickComplete=false
    this.clickStoks=false
    this.clickWaiting=false
    this.clickQuastions=false
    this.productsTrue=this.productsDto.filter(x=>x.status==true)
    this.ngOnInit()
  }
  showFalseProducts(){
    // this.statusCheck=false
    this.statusTrue=false
    this.statusFalse=true
    this.clickMain=false;
    this.clickAll=true;
    this.clickAdd=false
    this.clickComplete=false
    this.clickWaiting=false
    this.clickQuastions=false
    this.clickStoks=false
    this.productsFalse=this.productsDto.filter(x=>x.status==false)
    this.ngOnInit()
  }
  showOrderWaits(){
    this.statusTrue=false
    this.statusFalse=false
    this.clickMain=false;
    this.clickAll=false;
    this.clickComplete=false
    this.clickWaiting=true    
    this.clickAdd=false
    this.clickQuastions=false
    this.clickStoks=false
    this.artisansOrdersFalse=this.artisansOrders.filter(x=>x.status==false)
    this.ngOnInit()
  }
  showOrderComplete(){
    this.statusTrue=false
    this.statusFalse=false
    this.clickComplete=true
    this.clickWaiting=false
    this.clickMain=false;
    this.clickAll=false;
    this.clickQuastions=false
    this.clickStoks=false
    this.clickAdd=false
    this.artisansOrdersTrue=this.artisansOrders.filter(x=>x.status==true)
    this.ngOnInit()
  }
  showQuastions(){
    this.statusTrue=false
    this.statusFalse=false
    this.clickComplete=false
    this.clickWaiting=false
    this.clickMain=false;
    this.clickAll=false;
    this.clickAdd=false
    this.clickStoks=false
    this.clickQuastions=true
    this.ngOnInit()
  }
  showStoks(){
    this.stoksCheckProducts()
    this.statusTrue=false
    this.statusFalse=false
    this.clickComplete=false
    this.clickWaiting=false
    this.clickMain=false;
    this.clickAll=false;
    this.clickAdd=false
    this.clickQuastions=false
    this.clickStoks=true
    this.ngOnInit()
  }
  stoksProducts:ProductDto[]=[]
  stoksCheckProducts(){
    this.stoksProducts=this.productsTrue.filter(x=>x.unitInStock<10)
  }

  suspend(productId:number){    
    this.productService.suspendProduct(productId).subscribe(response=>{
      this.toastrService.info(response.message,"Başarılı")
      this.ngOnInit()
    })
  }
  retrieve(productId:number){    
    this.productService.retrieveProduct(productId).subscribe(response=>{
      this.toastrService.info(response.message,"Başarılı")
      this.ngOnInit()
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
  getProductsDto() {
    this.productService.getProductsDdto().subscribe((response) => {
      this.products = response.data;    
    });
  }

 


isLastPage(): boolean {
    return this.products ? this.first === (this.products.length - this.rows): true;
}

isFirstPage(): boolean {
    return this.products ? this.first === 0 : true;
}

  esnafAnswerDtoTrue:EsnafAnswerDto[]
  getQuastionsBySellerId(sellerId:number){
    this.artisanService.getQuastionsById(sellerId).subscribe(response=>{
      this.esnafAnswerDto=response.data
      this.esnafAnswerDtoTrue=this.esnafAnswerDto.filter(x=>x.status==false)
    })
  }
  sellerAnswerAddForm:FormGroup
  createAnswerAddForm(){
    this.sellerAnswerAddForm=this.formBuilder.group({
      questionId: [],
      userId: [this.userId, [Validators.required]],
      answer: ['', [Validators.required]],
    })
  }
  openModal2(template: TemplateRef<any>) {
    this.createAnswerAddForm()
    this.modalRef = this.modalService.show(template);
  }
  
  answer(quastionId:string){    
    if(this.sellerAnswerAddForm.valid){
      let answerModel = Object.assign({},this.sellerAnswerAddForm.value)
      answerModel.questionId=quastionId
      this.sellerAnswerService.addAnswer(answerModel).subscribe((response)=>{
        this.toastrService.success("Cevap Gönderildi")
        this.modalRef?.hide()
        this.ngOnInit()
      })
    }
    else{
      this.toastrService.error("Lütfen Boş Bırakmayın")
    }
  }
}