import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductDto } from 'src/app/models/productDto';
import { ProductService } from 'src/app/services/product.service';
import {Table} from 'primeng/table';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {ViewEncapsulation} from '@angular/core';



@Component({
  selector: 'app-a-products',
  templateUrl: './a-products.component.html',
  styleUrls: ['./a-products.component.css'],
  providers: [ConfirmationService],
  encapsulation: ViewEncapsulation.None
})

export class AProductsComponent implements OnInit {
  modalRef?: BsModalRef;
  modalRef2?: BsModalRef;
  constructor(
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private primengConfig: PrimeNGConfig,
    private productService:ProductService,
    private categoryService:CategoryService,
    private toastrService:ToastrService,
    private modalService: BsModalService) { 
    }

  first = 0;
  rows = 6;
  products:ProductDto[]=[]
  product:ProductDto
  selectedProducts:ProductDto[]=[]
  list:number[]=[]
  statuses: any[];
  productAddForm: FormGroup;
  productUpdateForm:FormGroup
  selectedFile: File;
  selectedStatus:string
  categories:Category[]=[]
  loading:boolean
  userId:number=0
  ngOnInit(): void {
    this.userId=parseInt(localStorage.getItem("userId"))
    this.getAllCategories()
    this.getProductsDto();
    
    this.statuses = [
      {label: 'True', code: true},
      {label: 'False', code: false}
    ];
    
  }
  openModal(template: TemplateRef<any>,product?:ProductDto) {
    this.product=product    
    this.createProductUpdateForm() 
    this.modalRef = this.modalService.show(template);
    console.log(this.product);
  }
  openModal2(template: TemplateRef<any>) {
    this.createProductAddForm()  
    this.modalRef2 = this.modalService.show(template);
    console.log(this.product);
  }

  
  getProductsDto() {
    this.productService.getProductsDdto().subscribe((response) => {
      this.products = response.data;    
    });
  }
  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      price: ['', Validators.required],
      unitInStock: ['', Validators.required],
      categoryId: ['', Validators.required],
      image: [''],
      userId: [this.userId],
    });
  }
  createProductUpdateForm() {
    this.productUpdateForm = this.formBuilder.group({
      productName: [this.product.productName, Validators.required],
      productID: [this.product.productId, Validators.required],
      productDescription: [this.product.productDescription, Validators.required],
      price: [this.product.price, Validators.required],
      unitInStock: [this.product.unitInStock, Validators.required],
      categoryId: [this.product.categoryId, Validators.required],
      image: [''],
      userId: [this.userId],
    });
  }

  add() {
    console.log(this.productAddForm);
    if (this.productAddForm.valid) {
      const formData = new FormData();
      var userid : string = "7004";
      formData.append('userId', userid);
      formData.append('productName', this.productAddForm.get('productName').value);
      formData.append('price', this.productAddForm.get('price').value);
      formData.append('unitInStock', this.productAddForm.get('unitInStock').value);
      formData.append('categoryId', this.productAddForm.get('categoryId').value);
      formData.append(
          'Image',
          this.selectedFile,
          this.selectedFile.name
        );
      this.productService.add(formData).subscribe((response) => {
        this.toastrService.success("Ürün Eklendi");
        this.ngOnInit()
        this.modalRef2.hide()
      });
    }else{
      this.toastrService.error("Lütfen Boş Bırakmayın")
    }
  }

  update() {
    //console.log(this.productUpdateForm);
    if (this.productUpdateForm.valid) {
      console.log("geldi1");
      const formData = new FormData();
      var userid : string = "2003";
      formData.append('userId', this.product.userId.toString());
      formData.append('productName', this.productUpdateForm.get('productName').value);
      formData.append('productID', this.productUpdateForm.get('productID').value);
      formData.append('productDescription', this.productUpdateForm.get('productDescription').value);
      formData.append('price', this.productUpdateForm.get('price').value);
      formData.append('unitInStock', this.productUpdateForm.get('unitInStock').value);
      formData.append('categoryId', this.productUpdateForm.get('categoryId').value);
      formData.append('imagePath', this.product.imagePath);
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

  onFileSelected(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.selectedFile = <File>event.target.files[i];
      const file = (event.target as HTMLInputElement).files[i];
      this.productAddForm.patchValue({
        imagePath: file,
      });
      this.productAddForm.get('image').updateValueAndValidity();
    }
  }

  onFileSelectedUpdate(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.selectedFile = <File>event.target.files[i];
      const file = (event.target as HTMLInputElement).files[i];
      this.productUpdateForm.patchValue({
        imagePath: file,
      });
      this.productUpdateForm.get('image').updateValueAndValidity();
    }
  }
  
  deleteSelectProducts() {
    this.confirmationService.confirm({
        message: 'Seçili Ürünler Gizlenecek!!',
        header: 'DİKKAT',
        icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.hiddenProducts()
                this.selectedProducts = null;
                this.toastrService.info(this.selectedProducts+"asd")
                this.toastrService.info("Seçili Ürünler Gizlendi");
            }            
    });
}


  isLastPage(): boolean {
      return this.products ? this.first === (this.products.length - this.rows): true;
  }

  isFirstPage(): boolean {
      return this.products ? this.first === 0 : true;
  }


  selectProduct(product: ProductDto) {
    this.toastrService.success("Seçildi");
  }

  onRowSelect(event:any) {
    this.toastrService.success(event.productName,"Seçildi");
  }

  onRowUnselect(event:any) {
    this.toastrService.info(event.productName,"Kalktı");
  }

  hiddenProducts(){
    this.selectedProducts.forEach(item => {
      this.list.push(item.productId)
    });
    this.productService.hidden(this.list).subscribe(response=>{
      this.list=null  
      this.ngOnInit()
    })
    
  }

  getAllCategories(){
    this.categoryService.getCategories().subscribe((response)=>{
      this.categories=response.data
    })
  }
}
