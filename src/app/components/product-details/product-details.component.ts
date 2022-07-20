import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/services/basket.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ProductDto } from 'src/app/models/productDto';
import { User } from 'src/app/models/user';
import { Basket } from 'src/app/models/basket';
import { Yorum } from 'src/app/models/yorum';
import { YorumService } from 'src/app/services/yorum.service';
import { Yorumdto } from 'src/app/models/yorumdto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderDetailsDto } from 'src/app/models/orderDetailsDto';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { Favorite } from 'src/app/models/favorite';
import { FavoriteService } from 'src/app/services/favorite.service';
import { SellerQuestionService } from 'src/app/services/seller-question.service';
import { SellerQustionModel } from 'src/app/models/sellerQuestion';
import { SellerAnswerService } from 'src/app/services/seller-answer.service';
import { SellerAnswerModel } from 'src/app/models/sellerAnswer';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  modalRef?: BsModalRef;

  id: string;
  productsDto: ProductDto[] = [];
  productDto: ProductDto;
  yorumlar: Yorum[]=[];
  yorumDto:Yorumdto[]=[]
  companyName:any
  yorum: Yorum;
  userIds: number[]=[];
  users:User[]=[]
  productIdTemp=0
  userId = localStorage.getItem('userId');
  basket: Basket = { basketId: 0, userId: 0, productId: 0, quantity: 1 };
  commentAddForm :FormGroup

  favored=true  
  favorite: Favorite = { favoriteID: 0, userID: 0, productID: 0 };
  
  favorities : Favorite[]=[];

  orderDetailDto:OrderDetailsDto[]=[]
  
  sellerQuestions:SellerQustionModel[]=[]
  sellerAnswers:SellerAnswerModel[]=[]

  sellerQuestionAddForm:FormGroup
  sellerAnswerAddForm:FormGroup
  
  soruCevapBoyut:number
  yorumSkorOrt:number=0
  starRating:number=0

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private basketService: BasketService,
    private yorumService:YorumService,
    private userService:UserService,
    private formBuilder:FormBuilder,  
    private favoriteService:FavoriteService,  
    private orderDetailService:OrderDetailService,    
    private sellerQuestionService:SellerQuestionService,
    private sellerAnswerService:SellerAnswerService,
    private modalService: BsModalService

  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => (this.id = params['productId'])          
    );    
    this.productIdTemp=parseInt(this.id)
    console.log(this.productIdTemp);
    this.getDtoById(parseInt(this.id));
    this.getCommentByProductId(this.productIdTemp);
    this.getDtoByProductId(this.productIdTemp);
    this.createCommentAddForm();
    this.checkBuyOrder(parseInt(this.id),parseInt(this.userId))
    this.isFavoriteExists()
    this.getSellerQuestionByProductId(this.productIdTemp);
    this.createQuestionForm();
    this.createAnswerAddForm()
    this.getAllSellerAnswer()
    this.getFavorities()
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  createCommentAddForm(){
    this.commentAddForm = this.formBuilder.group({
      productID: [parseInt(this.id), Validators.required],
      userID: [parseInt(this.userId), [Validators.required]],
      commentHeading: ['', [Validators.required]],
      commentContent: ['', [Validators.required, Validators.max(140)]],
      score: ['', [Validators.required, Validators.max(5)]],
    });
  }

  commentAdd(){    
    if(this.commentAddForm.valid){
      let commentModel = Object.assign({},this.commentAddForm.value)
      console.log(commentModel)
      this.yorumService.addComment(commentModel).subscribe((response)=>{
        this.toastrService.success("Yorum Başarılı")
        this.ngOnInit()
        this.modalRef.hide()
      })
    }
    else{
      this.toastrService.error("Lütfen Boş Bırakmayın")
    }
  }

  getDtoById(productId: number) {
    this.productService.getProductsDtoById(productId).subscribe((response) => {
      this.productsDto = response.data;
      this.soruyaCevapVersinMi();
      this.productDto = this.productsDto[0];
      this.companyName=this.productDto.userCompany
      console.log(this.companyName)
    });
  }

  soruyaCevapVersinMi(){
    return this.productsDto.find(x=>x.userId==parseInt(this.userId))    
  }

  addToBasket() {
    this.basket.productId = parseInt(this.id);
    this.basket.userId = parseInt(this.userId);
    if (localStorage.getItem('token')) {
      this.basketService.add(this.basket).subscribe((response) => {
        this.toastrService.success(response.message, 'Başarılı');
      });
    } else {
      this.toastrService.error('önce giriş yapın');
    }
  }

  getUserbyUserID(userIds:number[]) {
    for (let i = 0; i < userIds.length; i++) {
      this.userService.getById(userIds[i]).subscribe(response=>{
        this.users[i]=response.data
        console.log(this.users);
        
      })
    }
  }

  getCommentByProductId(productId: number) {
    this.yorumService.getByProductId(productId).subscribe((response) => {
      this.yorumlar = response.data;       
      this.getUserbyUserID(this.userIds);
    });    
  }


  getDtoByProductId(productId: number) {
    this.yorumService.getDtoByProductId(productId).subscribe((response) => {
      this.yorumDto = response.data;    
      this.getUserbyUserID(this.userIds);
      this.yorumSkorHesapla()
    });    
  }

  



  yorumYapsin=false;
  checkBuyOrder(productID:number,userID:number){
    this.orderDetailService.checkBuyOrder(productID,userID).subscribe((response)=>{
      this.orderDetailDto=response.data
      console.log(this.orderDetailDto)
      console.log("boyut: "+this.orderDetailDto.length)
      if(this.orderDetailDto.length>0){
        this.yorumYapsin=true;
      }else{
        this.yorumYapsin=false
      }
      console.log("yorum yapsın: "+this.yorumYapsin)
    });
  }

  getFavorities() {
    this.favoriteService.getFavorites(parseInt(this.userId)).subscribe(response =>{
      this.favorities = response.data
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
    this.favorite.userID = parseInt(this.userId);
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
      if(fav.userID==parseInt(this.userId) &&fav.productID==productId){
        this.favorite=fav 
      }
    });
    this.favoriteService
        .getFavorites(parseInt(this.userId))
        .subscribe((response) => {
          var fav = response.data;
          this.favoriteService.delete(this.favorite).subscribe((response) => {
            this.toastrService.error(response.message, 'Başarılı');
            window.location.reload();
            
          });
        });
  } 

  isFavoriteExists() {
    this.favoriteService
      .getFavorites(parseInt(this.userId))
      .subscribe((response) => {
        var fav = response.data;
        fav.forEach((element) => {
          console.log(element);
          if (element.productID == parseInt(this.id)) {
            this.favored=false;
          }
          else {
            this.favored = true;
          }
          if(!element){
            this.favored=true;
          }
        });
      });
  }






  

  createQuestionForm(){
    this.sellerQuestionAddForm=this.formBuilder.group({
      productId: [parseInt(this.id), Validators.required],
      userId: [parseInt(this.userId), [Validators.required]],
      question: ['', [Validators.required]]
    });
  }

  sellerQuestionAdd(){    
    if(this.sellerQuestionAddForm.valid){
      let questionModel = Object.assign({},this.sellerQuestionAddForm.value)
      this.sellerQuestionService.addQuestion(questionModel).subscribe((response)=>{
        this.toastrService.success("Soru Başarılı")
        this.modalRef?.hide()
        this.ngOnInit()
      })
    }
    else{
      this.toastrService.error("Lütfen Boş Bırakmayın")
    }
    
  }

  createAnswerAddForm(){
    this.sellerAnswerAddForm=this.formBuilder.group({
      questionId: [''],
      userId: [parseInt(this.userId), [Validators.required]],
      answer: ['', [Validators.required]],
    })
  }


  sellerAnswerAdd(itemId:number){
    if(this.sellerAnswerAddForm.valid){
      let answerModel = Object.assign({},this.sellerAnswerAddForm.value)
      answerModel.questionId = itemId;
      console.log(answerModel)
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



  getSellerQuestionByProductId(productId:number){
    this.sellerQuestionService.getAllQuestionByProductId(productId).subscribe((response)=>{
      this.sellerQuestions=response.data
      this.soruCevapBoyut=response.data.length
      console.log("sorularProdduct",this.sellerQuestions)
    })
  }

  getAllSellerAnswer(){
    this.sellerAnswerService.getAllAnswer().subscribe((response)=>{
      this.sellerAnswers=response.data
    })
  }

  getAnswerByQuestionId(questionId:number){
    return this.sellerAnswers.filter(x=>x.questionId==questionId)
  }


  createForLoop(score:number){
    let scores: any[] = [
      { icon: '', index: 0 },
      { icon: '', index: 1 },
      { icon: '', index: 2},
      { icon: '', index: 3},
      { icon: '', index: 4},
    ];
    for (let i = 0; i < scores.length; i++) {
      if(i < score){
        scores[i].icon = "mdi mdi-star";
      }else{
        scores[i].icon = "mdi mdi-star-outline";
      }
    }
    return scores;
  }


  yorumSkorHesapla(){
    let toplam=0
    this.yorumDto.forEach(element => {
      toplam=toplam+element.score
    });
    this.yorumSkorOrt=Number((toplam/this.yorumDto.length).toFixed(0))

    this.starUpdate()
  }

  starUpdate(){
    if(this.yorumSkorOrt>0){
    this.productService.starUpdate(this.productIdTemp,this.yorumSkorOrt).subscribe((response)=>{
    })
    }
  }



}




